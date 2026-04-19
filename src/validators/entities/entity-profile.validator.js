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

  return {
    sanitizedData,
    errors,
  };
}

module.exports = {
  validateEntityProfileInput,
};
