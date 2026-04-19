const assert = require("node:assert/strict");

const {
  validateEventFilters,
} = require("../../../../src/validators/events/event-filters.validator");

function testValidateEventFiltersSanitizesInvalidDateAndText() {
  const filters = validateEventFilters({
    eventDate: "fecha-invalida",
    city: "  Madrid  ",
    entity: "  Horizonte  ",
  });

  assert.equal(filters.eventDate, "");
  assert.equal(filters.city, "Madrid");
  assert.equal(filters.entity, "Horizonte");
}

module.exports = {
  testValidateEventFiltersSanitizesInvalidDateAndText,
};
