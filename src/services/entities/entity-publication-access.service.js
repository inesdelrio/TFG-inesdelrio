function assertEntityCanPublishEvents(entity) {
  if (entity && entity.validationStatus === "SUSPENDIDA") {
    const error = new Error("Entity is suspended and cannot publish events.");
    error.code = "ENTITY_SUSPENDED_FOR_PUBLISHING";
    throw error;
  }

  if (!entity || entity.validationStatus !== "VERIFICADA") {
    const error = new Error("Entity is not verified to publish events.");
    error.code = "ENTITY_NOT_VERIFIED_FOR_PUBLISHING";
    throw error;
  }

  return true;
}

module.exports = {
  assertEntityCanPublishEvents,
};
