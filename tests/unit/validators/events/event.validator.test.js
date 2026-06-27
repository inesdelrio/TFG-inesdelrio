const assert = require("node:assert/strict");

const { validateEventInput } = require("../../../../src/validators/events/event.validator");

function testValidateEventInputRejectsInvalidData() {
  const result = validateEventInput({
    title: "Abc",
    description: "Corta",
    address: "1234",
    eventDate: "2020-01-01",
    eventTime: "10:00",
    totalSlots: "0",
  });

  assert.ok(result.errors.title);
  assert.ok(result.errors.description);
  assert.ok(result.errors.address);
  assert.ok(result.errors.eventDate);
  assert.ok(result.errors.totalSlots);
}

function testValidateEventInputRejectsMissingMadridLocation() {
  const result = validateEventInput({
    title: "Recogida solidaria",
    description: "Descripcion suficientemente larga para publicar un evento.",
    city: "Madrid",
    address: "Calle Mayor 10",
    eventDate: "2099-01-01",
    eventTime: "10:00",
    totalSlots: "10",
  });

  assert.ok(result.errors.latitude);
  assert.ok(result.errors.longitude);
  assert.ok(result.errors.normalizedAddress);
}

function testValidateEventInputAcceptsValidMadridLocation() {
  const result = validateEventInput({
    title: "Recogida solidaria",
    description: "Descripcion suficientemente larga para publicar un evento.",
    city: "Madrid",
    address: "Calle Mayor 10",
    eventDate: "2099-01-01",
    eventTime: "10:00",
    totalSlots: "10",
    latitude: "40.416800",
    longitude: "-3.703800",
    normalizedAddress: "Calle Mayor 10, Madrid",
  });

  assert.deepEqual(result.errors, {});
  assert.equal(result.sanitizedData.city, "Madrid");
  assert.equal(result.sanitizedData.address, "Calle Mayor 10, Madrid");
  assert.equal(result.sanitizedData.latitude, 40.4168);
  assert.equal(result.sanitizedData.longitude, -3.7038);
  assert.equal(result.sanitizedData.normalizedAddress, "Calle Mayor 10, Madrid");
}

module.exports = {
  testValidateEventInputAcceptsValidMadridLocation,
  testValidateEventInputRejectsInvalidData,
  testValidateEventInputRejectsMissingMadridLocation,
};
