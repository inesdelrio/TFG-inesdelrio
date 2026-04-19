function sanitizeText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function validateEventInput(input = {}) {
  const sanitizedData = {
    title: sanitizeText(input.title),
    description: sanitizeText(input.description),
    city: sanitizeText(input.city),
    address: sanitizeText(input.address),
    eventDate: sanitizeText(input.eventDate),
    eventTime: sanitizeText(input.eventTime),
    totalSlots: sanitizeText(input.totalSlots),
  };

  const errors = {};

  if (sanitizedData.title.length < 5) {
    errors.title = "El titulo del evento debe tener al menos 5 caracteres.";
  }

  if (sanitizedData.description.length < 20) {
    errors.description = "La descripcion debe tener al menos 20 caracteres.";
  }

  if (sanitizedData.city.length < 2) {
    errors.city = "La ciudad debe tener al menos 2 caracteres.";
  }

  if (sanitizedData.address.length < 5) {
    errors.address = "La direccion debe tener al menos 5 caracteres.";
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(sanitizedData.eventDate)) {
    errors.eventDate = "Introduce una fecha valida.";
  }

  if (!/^\d{2}:\d{2}$/.test(sanitizedData.eventTime)) {
    errors.eventTime = "Introduce una hora valida.";
  }

  const slots = Number(sanitizedData.totalSlots);
  if (!Number.isInteger(slots) || slots < 1) {
    errors.totalSlots = "Las plazas deben ser un numero entero mayor que cero.";
  }

  if (!errors.eventDate && !errors.eventTime) {
    const startsAt = new Date(`${sanitizedData.eventDate}T${sanitizedData.eventTime}:00`);
    if (Number.isNaN(startsAt.getTime()) || startsAt <= new Date()) {
      errors.eventDate = "La fecha y hora del evento deben estar en el futuro.";
    }
  }

  return {
    sanitizedData,
    errors,
  };
}

module.exports = {
  validateEventInput,
};
