const listAdminMapMarkers = require("../../services/maps/list-admin-map-markers.service");

async function renderAdminMap(req, res, next) {
  try {
    const markers = await listAdminMapMarkers();

    return res.render("pages/admin/map", {
      pageTitle: "Mapa de administracion",
      markers,
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  renderAdminMap,
};
