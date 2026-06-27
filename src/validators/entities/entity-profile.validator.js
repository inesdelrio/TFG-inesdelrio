const {
  validateMadridLocation,
} = require("../../services/maps/validate-madrid-location.service");

function sanitizeText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function validateEntityProfileInput(input = {}) {
  const sanitizedData = {
    organizationName: sanitizeText(input.organizationName),
    contactEmail: sanitizeText(input.contactEmail).toLowerCase(),
    contactPhone: sanitizeText(input.contactPhone),
    city: sanitizeText(input.city),
    address: sanitizeText(input.address),
    description: sanitizeText(input.description),
    supportingInfo: sanitizeText(input.supportingInfo),
    latitude: input.latitude,
    longitude: input.longitude,
    normalizedAddress: sanitizeText(input.normalizedAddress),
  };

  const errors = {};

  if (sanitizedData.organizationName.length < 3) {
    errors.organizationName = "El nombre visible de la entidad debe tener al menos 3 caracteres.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sanitizedData.contactEmail)) {
    errors.contactEmail = "Introduce un email de contacto valido.";
  }

  if (!/^[0-9+\s-]{9,20}$/.test(sanitizedData.contactPhone)) {
    errors.contactPhone = "Introduce un telefono de contacto valido.";
  }

  if (sanitizedData.city.length < 2) {
    errors.city = "La ciudad debe tener al menos 2 caracteres.";
  }

  if (sanitizedData.address.length < 5) {
    errors.address = "La direccion debe tener al menos 5 caracteres.";
  }

  if (sanitizedData.description.length < 20) {
    errors.description = "La descripcion debe tener al menos 20 caracteres.";
  }

  const location = validateMadridLocation(
    {
      latitude: sanitizedData.latitude,
      longitude: sanitizedData.longitude,
      normalizedAddress: sanitizedData.normalizedAddress,
    },
    {
      requireAddress: true,
    },
  );

  if (!location.isValid) {
    Object.assign(errors, location.errors);
  }

  sanitizedData.latitude = location.sanitizedData.latitude;
  sanitizedData.longitude = location.sanitizedData.longitude;
  sanitizedData.normalizedAddress = location.sanitizedData.normalizedAddress;

  return {
    sanitizedData,
    errors,
  };
}

module.exports = {
  validateEntityProfileInput,
};
