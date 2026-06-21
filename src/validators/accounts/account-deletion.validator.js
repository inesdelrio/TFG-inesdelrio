function validateAccountDeletion(payload = {}) {
  const confirmation =
    typeof payload.confirmation === "string" ? payload.confirmation.trim() : "";
  const errors = {};

  if (confirmation !== "ELIMINAR") {
    errors.confirmation = "Escribe ELIMINAR para confirmar la baja definitiva.";
  }

  return {
    confirmation,
    errors,
  };
}

module.exports = {
  validateAccountDeletion,
};
