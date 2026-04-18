function normalizeString(value) {
  return typeof value === "string" ? value.trim() : "";
}

function validateLoginInput(payload = {}) {
  const sanitizedData = {
    email: normalizeString(payload.email).toLowerCase(),
  };

  const password = typeof payload.password === "string" ? payload.password : "";
  const errors = {};

  if (!sanitizedData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sanitizedData.email)) {
    errors.email = "Introduce un email valido.";
  }

  if (!password) {
    errors.password = "Introduce tu contraseña.";
  }

  return {
    sanitizedData,
    errors,
  };
}

module.exports = {
  validateLoginInput,
};
