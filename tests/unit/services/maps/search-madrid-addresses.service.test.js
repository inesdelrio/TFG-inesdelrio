const assert = require("node:assert/strict");

const searchMadridAddresses = require("../../../../src/services/maps/search-madrid-addresses.service");

async function testSearchMadridAddressesReturnsEmptyForShortQuery() {
  const results = await searchMadridAddresses(
    {
      q: "so",
    },
    {
      fetch: async () => {
        throw new Error("No deberia llamar a Nominatim");
      },
    },
  );

  assert.deepEqual(results, []);
}

async function testSearchMadridAddressesMapsValidMadridResults() {
  let requestedUrl = null;
  const results = await searchMadridAddresses(
    {
      q: "Puerta del Sol",
    },
    {
      fetch: async (url) => {
        requestedUrl = url;
        return {
          ok: true,
          json: async () => [
            {
              display_name: "Puerta del Sol, Madrid, Comunidad de Madrid, España",
              lat: "40.416800",
              lon: "-3.703800",
            },
          ],
        };
      },
    },
  );

  assert.ok(requestedUrl.includes("format=json"));
  assert.ok(requestedUrl.includes("bounded=1"));
  assert.equal(results.length, 1);
  assert.deepEqual(results[0], {
    label: "Puerta del Sol, Madrid, Comunidad de Madrid, España",
    normalizedAddress: "Puerta del Sol, Madrid, Comunidad de Madrid, España",
    latitude: 40.4168,
    longitude: -3.7038,
  });
}

async function testSearchMadridAddressesFiltersResultsOutsideMadrid() {
  const results = await searchMadridAddresses(
    {
      q: "Barcelona",
    },
    {
      fetch: async () => ({
        ok: true,
        json: async () => [
          {
            display_name: "Barcelona, Catalunya, España",
            lat: "41.387400",
            lon: "2.168600",
          },
        ],
      }),
    },
  );

  assert.deepEqual(results, []);
}

async function testSearchMadridAddressesPreservesProviderStatusOnFailure() {
  await assert.rejects(
    searchMadridAddresses(
      {
        q: "Puerta del Sol",
      },
      {
        fetch: async () => ({
          ok: false,
          status: 429,
        }),
      },
    ),
    (error) => {
      assert.equal(error.code, "GEOCODING_PROVIDER_ERROR");
      assert.equal(error.statusCode, 429);
      return true;
    },
  );
}

module.exports = {
  testSearchMadridAddressesFiltersResultsOutsideMadrid,
  testSearchMadridAddressesMapsValidMadridResults,
  testSearchMadridAddressesPreservesProviderStatusOnFailure,
  testSearchMadridAddressesReturnsEmptyForShortQuery,
};
