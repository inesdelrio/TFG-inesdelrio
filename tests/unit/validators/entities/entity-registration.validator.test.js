const assert = require("node:assert/strict");

const {
  validateEntityRegistrationInput,
} = require("../../../../src/validators/entities/entity-registration.validator");

function testValidateEntityRegistrationInputRejectsInvalidData() {
  const result = validateEntityRegistrationInput({
    organizationName: "A",
    legalName: "",
    taxId: "12",
    contactEmail: "correo",
    contactPhone: "abc",
    city: "",
    address: "123",
    description: "corta",
    supportingInfo: "",
  });

  assert.ok(result.errors.organizationName);
  assert.ok(result.errors.legalName);
  assert.ok(result.errors.taxId);
  assert.ok(result.errors.contactEmail);
  assert.ok(result.errors.contactPhone);
  assert.ok(result.errors.city);
  assert.ok(result.errors.address);
  assert.ok(result.errors.description);
}

module.exports = {
  testValidateEntityRegistrationInputRejectsInvalidData,
};
