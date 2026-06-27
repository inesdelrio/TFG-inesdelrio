const {
  validateMadridLocation,
} = require("../../services/maps/validate-madrid-location.service");

function sanitizeText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function validateEntityPublicRegistrationInput(input = {}) {
  const sanitizedData = {
    firstName: sanitizeText(input.firstName),
    lastName: sanitizeText(input.lastName),
    email: sanitizeText(input.email).toLowerCase(),
    phone: sanitizeText(input.phone),
    organizationName: sanitizeText(input.organizationName),
    taxId: sanitizeText(input.taxId).toUpperCase(),
    contactEmail: sanitizeText(input.email).toLowerCase(),
    contactPhone: sanitizeText(input.contactPhone),
    city: "Madrid",
    address: sanitizeText(input.normalizedAddress || input.address),
    latitude: input.latitude,
    longitude: input.longitude,
    normalizedAddress: sanitizeText(input.normalizedAddress),
    description: sanitizeText(input.description),
    supportingInfo: sanitizeText(input.supportingInfo),
  };

  const password = typeof input.password === "string" ? input.password : "";
  const passwordConfirm =
    typeof input.passwordConfirm === "string" ? input.passwordConfirm : "";
  const errors = {};

  if (sanitizedData.firstName.length < 2) {
    errors.firstName = "Introduce un nombre valido de al menos 2 caracteres.";
  }

  if (sanitizedData.lastName.length < 2) {
    errors.lastName = "Introduce apellidos validos de al menos 2 caracteres.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sanitizedData.email)) {
    errors.email = "Introduce un email valido.";
  }

  if (sanitizedData.phone && !/^[0-9+\s()-]{9,20}$/.test(sanitizedData.phone)) {
    errors.phone = "Introduce un telefono valido o deja el campo vacio.";
  }

  if (password.length < 8) {
    errors.password = "La contraseña debe tener al menos 8 caracteres.";
  }

  if (password !== passwordConfirm) {
    errors.passwordConfirm = "Las contraseñas no coinciden.";
  }

  if (sanitizedData.organizationName.length < 3) {
    errors.organizationName = "Introduce un nombre visible valido para la entidad.";
  }

  sanitizedData.legalName = sanitizedData.organizationName;

  if (!/^[A-Z0-9-]{8,15}$/.test(sanitizedData.taxId)) {
    errors.taxId = "Introduce un CIF/NIF valido en formato basico.";
  }

  if (!/^[0-9+\s()-]{9,20}$/.test(sanitizedData.contactPhone)) {
    errors.contactPhone = "Introduce un telefono de contacto valido.";
  }

  if (sanitizedData.address.length < 5) {
    errors.address = "Introduce una direccion valida.";
  }

  if (sanitizedData.description.length < 30) {
    errors.description = "Describe la entidad con al menos 30 caracteres.";
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
  sanitizedData.address = location.sanitizedData.normalizedAddress || sanitizedData.address;

  return {
    sanitizedData,
    errors,
  };
}

module.exports = {
  validateEntityPublicRegistrationInput,
};
