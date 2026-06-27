const listEntityMapMarkers = require("../../services/maps/list-entity-map-markers.service");

async function renderEntityMap(req, res, next) {
  try {
    const markers = await listEntityMapMarkers({
      userId: req.currentUser.id,
    });

    return res.render("pages/entities/map", {
      pageTitle: "Mapa de entidad",
      markers,
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  renderEntityMap,
};
