const assert = require("node:assert/strict");

const {
  assertEntityCanPublishEvents,
} = require("../../../../src/services/entities/entity-publication-access.service");

function testAssertEntityCanPublishEventsAllowsVerifiedEntity() {
  assert.equal(assertEntityCanPublishEvents({ validationStatus: "VERIFICADA" }), true);
}

function testAssertEntityCanPublishEventsRejectsPendingEntity() {
  assert.throws(
    () => assertEntityCanPublishEvents({ validationStatus: "PENDIENTE" }),
    (error) => error.code === "ENTITY_NOT_VERIFIED_FOR_PUBLISHING",
  );
}

function testAssertEntityCanPublishEventsRejectsSuspendedEntity() {
  assert.throws(
    () => assertEntityCanPublishEvents({ validationStatus: "SUSPENDIDA" }),
    (error) => error.code === "ENTITY_SUSPENDED_FOR_PUBLISHING",
  );
}

module.exports = {
  testAssertEntityCanPublishEventsAllowsVerifiedEntity,
  testAssertEntityCanPublishEventsRejectsPendingEntity,
  testAssertEntityCanPublishEventsRejectsSuspendedEntity,
};
