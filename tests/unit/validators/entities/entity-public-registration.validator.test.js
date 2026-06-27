const assert = require("node:assert/strict");

const {
  validateEntityPublicRegistrationInput,
} = require("../../../../src/validators/entities/entity-public-registration.validator");

function buildValidInput(overrides = {}) {
  return {
    firstName: "Laura",
    lastName: "Garcia",
    email: "laura@example.com",
    password: "password123",
    passwordConfirm: "password123",
    organizationName: "Fundacion Madrid",
    legalName: "Fundacion Madrid Social",
    taxId: "G12345678",
    contactPhone: "612345678",
    city: "Madrid",
    address: "Calle Mayor 10",
    latitude: "40.416800",
    longitude: "-3.703800",
    normalizedAddress: "Calle Mayor 10, Madrid",
    description: "Entidad dedicada a proyectos sociales dentro de Madrid.",
    supportingInfo: "Documentacion disponible.",
    ...overrides,
  };
}

function testValidateEntityPublicRegistrationRejectsInvalidMadridLocation() {
  const result = validateEntityPublicRegistrationInput(
    buildValidInput({
      latitude: "41.000000",
      longitude: "-3.703800",
      normalizedAddress: "Fuera de Madrid",
    }),
  );

  assert.ok(result.errors.coordinates);
}

function testValidateEntityPublicRegistrationAcceptsValidMadridLocation() {
  const result = validateEntityPublicRegistrationInput(buildValidInput());

  assert.deepEqual(result.errors, {});
  assert.equal(result.sanitizedData.email, "laura@example.com");
  assert.equal(result.sanitizedData.contactEmail, "laura@example.com");
  assert.equal(result.sanitizedData.latitude, 40.4168);
  assert.equal(result.sanitizedData.longitude, -3.7038);
}

function testValidateEntityPublicRegistrationRejectsInvalidPassword() {
  const result = validateEntityPublicRegistrationInput(
    buildValidInput({
      password: "short",
      passwordConfirm: "different",
    }),
  );

  assert.ok(result.errors.password);
  assert.ok(result.errors.passwordConfirm);
}

module.exports = {
  testValidateEntityPublicRegistrationAcceptsValidMadridLocation,
  testValidateEntityPublicRegistrationRejectsInvalidMadridLocation,
  testValidateEntityPublicRegistrationRejectsInvalidPassword,
};
