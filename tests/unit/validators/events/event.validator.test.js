const assert = require("node:assert/strict");

const { validateEventInput } = require("../../../../src/validators/events/event.validator");

function testValidateEventInputRejectsInvalidData() {
  const result = validateEventInput({
    title: "Abc",
    description: "Corta",
    city: "M",
    address: "1234",
    eventDate: "2020-01-01",
    eventTime: "10:00",
    totalSlots: "0",
  });

  assert.ok(result.errors.title);
  assert.ok(result.errors.description);
  assert.ok(result.errors.city);
  assert.ok(result.errors.address);
  assert.ok(result.errors.eventDate);
  assert.ok(result.errors.totalSlots);
}

module.exports = {
  testValidateEventInputRejectsInvalidData,
};
