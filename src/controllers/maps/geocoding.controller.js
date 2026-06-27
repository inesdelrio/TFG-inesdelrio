const searchMadridAddresses = require("../../services/maps/search-madrid-addresses.service");

async function searchMadridAddressesAction(req, res, next) {
  try {
    const q = typeof req.query.q === "string" ? req.query.q : "";
    const suggestions = await searchMadridAddresses({ q });

    return res.json({ suggestions });
  } catch (error) {
    if (
      error.code === "GEOCODING_PROVIDER_ERROR" ||
      error.code === "GEOCODING_FETCH_UNAVAILABLE"
    ) {
      return res.status(502).json({
        suggestions: [],
        error: "No se ha podido buscar la direccion en este momento.",
      });
    }

    return next(error);
  }
}

module.exports = {
  searchMadridAddressesAction,
};
