const assert = require("node:assert/strict");

const {
  validateMadridLocation,
} = require("../../../../src/services/maps/validate-madrid-location.service");

function testValidateMadridLocationAcceptsCoordinatesInsideMadrid() {
  const result = validateMadridLocation({
    latitude: "40.416800",
    longitude: "-3.703800",
  });

  assert.equal(result.isValid, true);
  assert.deepEqual(result.errors, {});
  assert.equal(result.sanitizedData.latitude, 40.4168);
  assert.equal(result.sanitizedData.longitude, -3.7038);
}

function testValidateMadridLocationRejectsMissingLatitude() {
  const result = validateMadridLocation({
    longitude: "-3.703800",
  });

  assert.equal(result.isValid, false);
  assert.equal(result.errors.latitude, "La latitud es obligatoria.");
}

function testValidateMadridLocationRejectsMissingLongitude() {
  const result = validateMadridLocation({
    latitude: "40.416800",
  });

  assert.equal(result.isValid, false);
  assert.equal(result.errors.longitude, "La longitud es obligatoria.");
}

function testValidateMadridLocationRejectsNonNumericValues() {
  const result = validateMadridLocation({
    latitude: "centro",
    longitude: "oeste",
  });

  assert.equal(result.isValid, false);
  assert.equal(result.errors.latitude, "La latitud debe ser un valor numerico.");
  assert.equal(result.errors.longitude, "La longitud debe ser un valor numerico.");
}

function testValidateMadridLocationRejectsCoordinatesOutsideMadrid() {
  const result = validateMadridLocation({
    latitude: "41.387400",
    longitude: "2.168600",
  });

  assert.equal(result.isValid, false);
  assert.equal(
    result.errors.coordinates,
    "Las coordenadas deben estar dentro de Madrid.",
  );
}

function testValidateMadridLocationRejectsMissingAddressWhenRequired() {
  const result = validateMadridLocation(
    {
      latitude: "40.416800",
      longitude: "-3.703800",
      normalizedAddress: "",
    },
    {
      requireAddress: true,
    },
  );

  assert.equal(result.isValid, false);
  assert.equal(
    result.errors.normalizedAddress,
    "La direccion normalizada es obligatoria.",
  );
}

function testValidateMadridLocationAcceptsRequiredAddressWhenCoordinatesAreValid() {
  const result = validateMadridLocation(
    {
      latitude: "40.416800",
      longitude: "-3.703800",
      normalizedAddress: "Puerta del Sol, Madrid",
    },
    {
      requireAddress: true,
    },
  );

  assert.equal(result.isValid, true);
  assert.equal(result.sanitizedData.normalizedAddress, "Puerta del Sol, Madrid");
}

module.exports = {
  testValidateMadridLocationAcceptsCoordinatesInsideMadrid,
  testValidateMadridLocationAcceptsRequiredAddressWhenCoordinatesAreValid,
  testValidateMadridLocationRejectsCoordinatesOutsideMadrid,
  testValidateMadridLocationRejectsMissingAddressWhenRequired,
  testValidateMadridLocationRejectsMissingLatitude,
  testValidateMadridLocationRejectsMissingLongitude,
  testValidateMadridLocationRejectsNonNumericValues,
};
