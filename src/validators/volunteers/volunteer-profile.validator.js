function sanitizeText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function validateVolunteerProfileInput(input = {}) {
  const sanitizedData = {
    firstName: sanitizeText(input.firstName),
    lastName: sanitizeText(input.lastName),
    phone: sanitizeText(input.phone),
  };

  const errors = {};

  if (sanitizedData.firstName.length < 2) {
    errors.firstName = "El nombre debe tener al menos 2 caracteres.";
  }

  if (sanitizedData.lastName.length < 2) {
    errors.lastName = "Los apellidos deben tener al menos 2 caracteres.";
  }

  if (sanitizedData.phone && !/^[0-9+\s-]{9,20}$/.test(sanitizedData.phone)) {
    errors.phone = "Introduce un telefono valido.";
  }

  return {
    sanitizedData,
    errors,
  };
}

module.exports = {
  validateVolunteerProfileInput,
};
