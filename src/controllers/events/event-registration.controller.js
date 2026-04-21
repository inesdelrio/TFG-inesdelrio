const createEventRegistration = require("../../services/events/create-event-registration.service");
const deleteEventRegistration = require("../../services/events/delete-event-registration.service");

function resolveRedirectPath(rawRedirectTo, eventId) {
  if (typeof rawRedirectTo === "string" && rawRedirectTo === `/eventos/${eventId}`) {
    return rawRedirectTo;
  }

  return `/eventos/${eventId}`;
}

async function registerForEvent(req, res, next) {
  const eventId = Number(req.params.eventId);
  const redirectTo = resolveRedirectPath(req.body.redirectTo, eventId);

  try {
    await createEventRegistration({
      volunteerUserId: req.currentUser.id,
      eventId,
    });

    return res.redirect(`${redirectTo}?registered=1`);
  } catch (error) {
    if (error.code === "EVENT_REGISTRATION_ALREADY_EXISTS") {
      return res.redirect(`${redirectTo}?alreadyRegistered=1`);
    }

    if (error.code === "EVENT_FULL") {
      return res.redirect(`${redirectTo}?full=1`);
    }

    if (error.code === "EVENT_NOT_ACTIVE") {
      return res.redirect(`${redirectTo}?inactive=1`);
    }

    if (error.code === "EVENT_NOT_FOUND") {
      return res.status(404).render("pages/errors/404", {
        pageTitle: "Evento no encontrado",
      });
    }

    return next(error);
  }
}

async function cancelEventRegistration(req, res, next) {
  const eventId = Number(req.params.eventId);
  const redirectTo = resolveRedirectPath(req.body.redirectTo, eventId);

  try {
    await deleteEventRegistration({
      volunteerUserId: req.currentUser.id,
      eventId,
    });

    return res.redirect(`${redirectTo}?cancelled=1`);
  } catch (error) {
    if (error.code === "EVENT_REGISTRATION_NOT_FOUND") {
      return res.redirect(`${redirectTo}?notRegistered=1`);
    }

    return next(error);
  }
}

module.exports = {
  cancelEventRegistration,
  registerForEvent,
};
