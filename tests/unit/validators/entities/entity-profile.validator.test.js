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

function testValidateEntityProfileInputRejectsInvalidMadridLocationWhenAddressChanges() {
  const result = validateEntityProfileInput({
    organizationName: "Entidad Madrid",
    contactEmail: "contacto@entidad.test",
    contactPhone: "699112233",
    city: "Madrid",
    address: "Calle Mayor 10",
    description: "Descripcion suficientemente larga para la entidad.",
    supportingInfo: "",
  });

  assert.ok(result.errors.latitude);
  assert.ok(result.errors.longitude);
  assert.ok(result.errors.normalizedAddress);
}

function testValidateEntityProfileInputAcceptsValidMadridLocation() {
  const result = validateEntityProfileInput({
    organizationName: "Entidad Madrid",
    contactEmail: "contacto@entidad.test",
    contactPhone: "699112233",
    city: "Madrid",
    address: "Calle Mayor 10",
    description: "Descripcion suficientemente larga para la entidad.",
    supportingInfo: "",
    latitude: "40.416800",
    longitude: "-3.703800",
    normalizedAddress: "Calle Mayor 10, Madrid",
  });

  assert.deepEqual(result.errors, {});
  assert.equal(result.sanitizedData.latitude, 40.4168);
  assert.equal(result.sanitizedData.longitude, -3.7038);
  assert.equal(result.sanitizedData.normalizedAddress, "Calle Mayor 10, Madrid");
}

module.exports = {
  testValidateEntityProfileInputAcceptsValidMadridLocation,
  testValidateEntityProfileInputRejectsInvalidData,
  testValidateEntityProfileInputRejectsInvalidMadridLocationWhenAddressChanges,
};
