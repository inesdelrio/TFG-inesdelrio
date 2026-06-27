const assert = require("node:assert/strict");

function loadControllerWithMocks(mocks = {}) {
  const controllerPath = require.resolve("../../../../src/controllers/maps/geocoding.controller");
  const servicePath = require.resolve("../../../../src/services/maps/search-madrid-addresses.service");
  const previousService = require.cache[servicePath];

  require.cache[servicePath] = {
    exports: mocks.searchMadridAddresses || (async () => []),
  };
  delete require.cache[controllerPath];

  const controller = require(controllerPath);

  if (previousService) {
    require.cache[servicePath] = previousService;
  } else {
    delete require.cache[servicePath];
  }

  delete require.cache[controllerPath];

  return controller;
}

async function testSearchMadridAddressesActionReturnsEmptyForMissingQuery() {
  let payload = null;
  const { searchMadridAddressesAction } = loadControllerWithMocks();

  await searchMadridAddressesAction(
    {
      query: {},
    },
    {
      json: (data) => {
        payload = data;
      },
    },
    (error) => {
      throw error;
    },
  );

  assert.deepEqual(payload, { suggestions: [] });
}

async function testSearchMadridAddressesActionReturnsMockedSuggestions() {
  let receivedInput = null;
  let payload = null;
  const { searchMadridAddressesAction } = loadControllerWithMocks({
    searchMadridAddresses: async (input) => {
      receivedInput = input;
      return [
        {
          label: "Puerta del Sol, Madrid",
          normalizedAddress: "Puerta del Sol, Madrid",
          latitude: 40.4168,
          longitude: -3.7038,
        },
      ];
    },
  });

  await searchMadridAddressesAction(
    {
      query: {
        q: "Puerta del Sol",
      },
    },
    {
      json: (data) => {
        payload = data;
      },
    },
    (error) => {
      throw error;
    },
  );

  assert.deepEqual(receivedInput, { q: "Puerta del Sol" });
  assert.equal(payload.suggestions.length, 1);
  assert.equal(payload.suggestions[0].label, "Puerta del Sol, Madrid");
}

module.exports = {
  testSearchMadridAddressesActionReturnsEmptyForMissingQuery,
  testSearchMadridAddressesActionReturnsMockedSuggestions,
};
