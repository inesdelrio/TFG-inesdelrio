const MADRID_BOUNDS = {
  minLatitude: 40.312,
  maxLatitude: 40.643,
  minLongitude: -3.889,
  maxLongitude: -3.517,
};

function sanitizeCoordinate(value) {
  if (value === null || value === undefined) {
    return "";
  }

  return String(value).trim();
}

function sanitizeText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function parseCoordinate(value) {
  const sanitizedValue = sanitizeCoordinate(value);

  if (!sanitizedValue) {
    return {
      value: null,
      isMissing: true,
      isNumeric: false,
    };
  }

  const numericValue = Number(sanitizedValue);

  return {
    value: Number.isFinite(numericValue) ? numericValue : null,
    isMissing: false,
    isNumeric: Number.isFinite(numericValue),
  };
}

function isInsideMadridBounds(latitude, longitude) {
  return (
    latitude >= MADRID_BOUNDS.minLatitude &&
    latitude <= MADRID_BOUNDS.maxLatitude &&
    longitude >= MADRID_BOUNDS.minLongitude &&
    longitude <= MADRID_BOUNDS.maxLongitude
  );
}

function validateMadridLocation(input = {}, options = {}) {
  const latitude = parseCoordinate(input.latitude);
  const longitude = parseCoordinate(input.longitude);
  const normalizedAddress = sanitizeText(input.normalizedAddress);
  const errors = {};

  if (latitude.isMissing) {
    errors.latitude = "La latitud es obligatoria.";
  } else if (!latitude.isNumeric) {
    errors.latitude = "La latitud debe ser un valor numerico.";
  }

  if (longitude.isMissing) {
    errors.longitude = "La longitud es obligatoria.";
  } else if (!longitude.isNumeric) {
    errors.longitude = "La longitud debe ser un valor numerico.";
  }

  if (
    latitude.isNumeric &&
    longitude.isNumeric &&
    !isInsideMadridBounds(latitude.value, longitude.value)
  ) {
    errors.coordinates = "Las coordenadas deben estar dentro de Madrid.";
  }

  if (options.requireAddress === true && !normalizedAddress) {
    errors.normalizedAddress = "La direccion normalizada es obligatoria.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    sanitizedData: {
      latitude: latitude.value,
      longitude: longitude.value,
      normalizedAddress,
    },
  };
}

module.exports = {
  MADRID_BOUNDS,
  isInsideMadridBounds,
  validateMadridLocation,
};
