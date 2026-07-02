const {
  validateMadridLocation,
} = require("./validate-madrid-location.service");

const NOMINATIM_SEARCH_URL = "https://nominatim.openstreetmap.org/search";
const MADRID_VIEWBOX = "-3.889,40.643,-3.517,40.312";
const MIN_QUERY_LENGTH = 3;

function normalizeQuery(value) {
  return typeof value === "string" ? value.trim() : "";
}

function buildNominatimUrl(query) {
  const params = new URLSearchParams({
    q: `${query}, Madrid`,
    format: "json",
    addressdetails: "1",
    limit: "5",
    countrycodes: "es",
    bounded: "1",
    viewbox: MADRID_VIEWBOX,
  });

  return `${NOMINATIM_SEARCH_URL}?${params.toString()}`;
}

function mapResult(result) {
  const location = validateMadridLocation(
    {
      latitude: result.lat,
      longitude: result.lon,
      normalizedAddress: result.display_name,
    },
    {
      requireAddress: true,
    },
  );

  if (!location.isValid) {
    return null;
  }

  return {
    label: location.sanitizedData.normalizedAddress,
    normalizedAddress: location.sanitizedData.normalizedAddress,
    latitude: location.sanitizedData.latitude,
    longitude: location.sanitizedData.longitude,
  };
}

async function searchMadridAddresses(input = {}, dependencies = {}) {
  const query = normalizeQuery(input.q);

  if (query.length < MIN_QUERY_LENGTH) {
    return [];
  }

  const fetchImpl = dependencies.fetch || global.fetch;

  if (typeof fetchImpl !== "function") {
    const error = new Error("Fetch API is not available.");
    error.code = "GEOCODING_FETCH_UNAVAILABLE";
    throw error;
  }

  const response = await fetchImpl(buildNominatimUrl(query), {
    headers: {
      "User-Agent": "VolunRed/1.0 (TFG geolocation)",
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    const error = new Error("Nominatim request failed.");
    error.code = "GEOCODING_PROVIDER_ERROR";
    error.statusCode = response.status;
    error.statusText = response.statusText || "";
    throw error;
  }

  const results = await response.json();

  if (!Array.isArray(results)) {
    return [];
  }

  return results.map(mapResult).filter(Boolean);
}

module.exports = searchMadridAddresses;
