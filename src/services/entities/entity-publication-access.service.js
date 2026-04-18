function assertEntityCanPublishEvents(entity) {
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
