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

module.exports = {
  testAssertEntityCanPublishEventsAllowsVerifiedEntity,
  testAssertEntityCanPublishEventsRejectsPendingEntity,
};
