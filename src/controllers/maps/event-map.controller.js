const listVolunteerEventMapMarkers = require("../../services/maps/list-volunteer-event-map-markers.service");

async function renderVolunteerEventMap(req, res, next) {
  try {
    const markers = await listVolunteerEventMapMarkers({
      volunteerUserId: req.currentUser ? req.currentUser.id : null,
    });

    return res.render("pages/events/map", {
      pageTitle: "Mapa de eventos",
      markers,
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  renderVolunteerEventMap,
};
