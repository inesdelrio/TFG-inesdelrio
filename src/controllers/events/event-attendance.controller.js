const listOwnedEventRegistrations = require("../../services/events/list-owned-event-registrations.service");

async function renderEventAttendees(req, res, next) {
  const eventId = Number(req.params.eventId);

  try {
    const result = await listOwnedEventRegistrations({
      userId: req.currentUser.id,
      eventId,
    });

    return res.render("pages/events/attendees", {
      pageTitle: `Inscritos - ${result.event.title}`,
      entity: result.entity,
      event: result.event,
      registrations: result.registrations,
    });
  } catch (error) {
    if (error.code === "EVENT_NOT_FOUND") {
      return res.status(404).render("pages/errors/404", {
        pageTitle: "Evento no encontrado",
      });
    }

    if (error.code === "EVENT_NOT_OWNED_BY_ENTITY") {
      return res.status(403).render("pages/errors/500", {
        pageTitle: "Acceso denegado",
        errorMessage: "Solo la entidad autora puede consultar los inscritos de este evento.",
      });
    }

    return next(error);
  }
}

module.exports = {
  renderEventAttendees,
};
