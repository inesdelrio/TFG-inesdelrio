const assert = require("node:assert/strict");

const {
  validateEntityProfileInput,
} = require("../../../../src/validators/entities/entity-profile.validator");

function testValidateEntityProfileInputRejectsInvalidData() {
  const result = validateEntityProfileInput({
    organizationName: "AB",
    contactEmail: "correo-invalido",
    contactPhone: "abc",
    city: "M",
    address: "1234",
    description: "Muy corta",
    supportingInfo: "",
  });

  assert.ok(result.errors.organizationName);
  assert.ok(result.errors.contactEmail);
  assert.ok(result.errors.contactPhone);
  assert.ok(result.errors.city);
  assert.ok(result.errors.address);
  assert.ok(result.errors.description);
}

module.exports = {
  testValidateEntityProfileInputRejectsInvalidData,
};
