const createEntitySubscription = require("../../services/entities/create-entity-subscription.service");

function resolveRedirectPath(rawRedirectTo) {
  if (typeof rawRedirectTo === "string" && rawRedirectTo.startsWith("/eventos/")) {
    return rawRedirectTo;
  }

  return "/eventos";
}

async function subscribeToEntity(req, res, next) {
  const entityId = Number(req.params.entityId);
  const redirectTo = resolveRedirectPath(req.body.redirectTo);

  try {
    await createEntitySubscription({
      volunteerUserId: req.currentUser.id,
      entityId,
    });

    return res.redirect(`${redirectTo}?subscribed=1`);
  } catch (error) {
    if (error.code === "ENTITY_SUBSCRIPTION_ALREADY_EXISTS") {
      return res.redirect(`${redirectTo}?alreadySubscribed=1`);
    }

    if (error.code === "ENTITY_NOT_FOUND") {
      return res.status(404).render("pages/errors/404", {
        pageTitle: "Entidad no encontrada",
      });
    }

    return next(error);
  }
}

module.exports = {
  subscribeToEntity,
};
