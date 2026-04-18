function normalizeString(value) {
  return typeof value === "string" ? value.trim() : "";
}

function validateVolunteerRegistrationInput(payload = {}) {
  const sanitizedData = {
    firstName: normalizeString(payload.firstName),
    lastName: normalizeString(payload.lastName),
    email: normalizeString(payload.email).toLowerCase(),
    phone: normalizeString(payload.phone),
  };

  const password = typeof payload.password === "string" ? payload.password : "";
  const passwordConfirm =
    typeof payload.passwordConfirm === "string" ? payload.passwordConfirm : "";

  const errors = {};

  if (!sanitizedData.firstName || sanitizedData.firstName.length < 2) {
    errors.firstName = "Introduce un nombre valido de al menos 2 caracteres.";
  }

  if (!sanitizedData.lastName || sanitizedData.lastName.length < 2) {
    errors.lastName = "Introduce apellidos validos de al menos 2 caracteres.";
  }

  if (!sanitizedData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sanitizedData.email)) {
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

  return {
    sanitizedData,
    errors,
  };
}

module.exports = {
  validateVolunteerRegistrationInput,
};
