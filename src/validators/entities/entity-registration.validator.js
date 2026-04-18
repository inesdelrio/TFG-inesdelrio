function normalizeString(value) {
  return typeof value === "string" ? value.trim() : "";
}

function validateEntityRegistrationInput(payload = {}) {
  const sanitizedData = {
    organizationName: normalizeString(payload.organizationName),
    legalName: normalizeString(payload.legalName),
    taxId: normalizeString(payload.taxId).toUpperCase(),
    contactEmail: normalizeString(payload.contactEmail).toLowerCase(),
    contactPhone: normalizeString(payload.contactPhone),
    city: normalizeString(payload.city),
    address: normalizeString(payload.address),
    description: normalizeString(payload.description),
    supportingInfo: normalizeString(payload.supportingInfo),
  };

  const errors = {};

  if (!sanitizedData.organizationName || sanitizedData.organizationName.length < 3) {
    errors.organizationName = "Introduce un nombre visible valido para la entidad.";
  }

  if (!sanitizedData.legalName || sanitizedData.legalName.length < 3) {
    errors.legalName = "Introduce la razon social o nombre legal de la entidad.";
  }

  if (!/^[A-Z0-9-]{8,15}$/.test(sanitizedData.taxId)) {
    errors.taxId = "Introduce un CIF/NIF valido en formato basico.";
  }

  if (
    !sanitizedData.contactEmail ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sanitizedData.contactEmail)
  ) {
    errors.contactEmail = "Introduce un email de contacto valido.";
  }

  if (!/^[0-9+\s()-]{9,20}$/.test(sanitizedData.contactPhone)) {
    errors.contactPhone = "Introduce un telefono de contacto valido.";
  }

  if (!sanitizedData.city || sanitizedData.city.length < 2) {
    errors.city = "Introduce la ciudad principal de la entidad.";
  }

  if (!sanitizedData.address || sanitizedData.address.length < 5) {
    errors.address = "Introduce una direccion valida.";
  }

  if (!sanitizedData.description || sanitizedData.description.length < 30) {
    errors.description = "Describe la entidad con al menos 30 caracteres.";
  }

  return {
    sanitizedData,
    errors,
  };
}

module.exports = {
  validateEntityRegistrationInput,
};
