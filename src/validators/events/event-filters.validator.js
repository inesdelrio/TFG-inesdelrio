function sanitizeText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function validateEventFilters(query = {}) {
  const sanitizedFilters = {
    eventDate: sanitizeText(query.eventDate),
    city: sanitizeText(query.city),
    entity: sanitizeText(query.entity),
  };

  if (!/^\d{4}-\d{2}-\d{2}$/.test(sanitizedFilters.eventDate)) {
    sanitizedFilters.eventDate = "";
  }

  return sanitizedFilters;
}

module.exports = {
  validateEventFilters,
};
