const {
  validateMadridLocation,
} = require("../../services/maps/validate-madrid-location.service");
const {
  MAX_EVENT_DAYS,
  getInclusiveDaySpan,
  parseLocalDateTime,
} = require("../../services/events/event-date-range.service");

function sanitizeText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function validateEventInput(input = {}) {
  const startDate = sanitizeText(input.startDate || input.eventDate);
  const endDate = sanitizeText(input.endDate) || startDate;
  const startTime = sanitizeText(input.startTime || input.eventTime);
  const endTime = sanitizeText(input.endTime || input.eventTime);
  const sanitizedData = {
    title: sanitizeText(input.title),
    description: sanitizeText(input.description),
    city: "Madrid",
    address: sanitizeText(input.normalizedAddress || input.address),
    startDate,
    endDate,
    startTime,
    endTime,
    eventDate: startDate,
    eventTime: startTime,
    totalSlots: sanitizeText(input.totalSlots),
    latitude: input.latitude,
    longitude: input.longitude,
    normalizedAddress: sanitizeText(input.normalizedAddress),
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

  if (!/^\d{4}-\d{2}-\d{2}$/.test(sanitizedData.startDate)) {
    errors.startDate = "Introduce una fecha de inicio valida.";
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(sanitizedData.endDate)) {
    errors.endDate = "Introduce una fecha de fin valida.";
  }

  if (!/^\d{2}:\d{2}$/.test(sanitizedData.startTime)) {
    errors.startTime = "Introduce una hora de inicio valida.";
  }

  if (!/^\d{2}:\d{2}$/.test(sanitizedData.endTime)) {
    errors.endTime = "Introduce una hora de fin valida.";
  }

  const slots = Number(sanitizedData.totalSlots);
  if (!Number.isInteger(slots) || slots < 1) {
    errors.totalSlots = "Las plazas deben ser un numero entero mayor que cero.";
  }

  if (!errors.startDate && !errors.endDate && !errors.startTime && !errors.endTime) {
    const startsAt = parseLocalDateTime(sanitizedData.startDate, sanitizedData.startTime);
    const endsAt = parseLocalDateTime(sanitizedData.endDate, sanitizedData.endTime);

    if (Number.isNaN(startsAt.getTime()) || startsAt <= new Date()) {
      errors.startDate = "La fecha y hora de inicio deben estar en el futuro.";
    }

    if (Number.isNaN(endsAt.getTime())) {
      errors.endDate = "Introduce una fecha y hora de fin validas.";
    } else if (endsAt < startsAt) {
      errors.endDate = "La fecha de fin no puede ser anterior a la fecha de inicio.";
    } else if (
      sanitizedData.startDate === sanitizedData.endDate &&
      endsAt <= startsAt
    ) {
      errors.endTime = "La hora de fin debe ser posterior a la hora de inicio.";
    } else if (getInclusiveDaySpan(startsAt, endsAt) > MAX_EVENT_DAYS) {
      errors.endDate = `La duracion maxima del evento es de ${MAX_EVENT_DAYS} dias.`;
    } else {
      sanitizedData.startsAt = startsAt;
      sanitizedData.endsAt = endsAt;
    }
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
  validateEventInput,
};
