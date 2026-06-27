const { getEventColorData } = require("../events/event-color.service");

function toNumber(value) {
  if (value === null || value === undefined) {
    return null;
  }

  const numberValue = Number(value);
  return Number.isFinite(numberValue) ? numberValue : null;
}

function formatDateTime(value) {
  return new Date(value).toLocaleString("es-ES", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function formatEventDateRange(event) {
  const startsAt = new Date(event.startsAt);
  const endsAt = event.endsAt ? new Date(event.endsAt) : startsAt;
  const startDate = startsAt.toLocaleDateString("es-ES");
  const endDate = endsAt.toLocaleDateString("es-ES");
  const startTime = startsAt.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const endTime = endsAt.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return startDate === endDate
    ? `${startDate}, de ${startTime} a ${endTime}`
    : `Del ${startDate} al ${endDate}, de ${startTime} a ${endTime}`;
}

function hasCoordinates(record) {
  return toNumber(record.latitude) !== null && toNumber(record.longitude) !== null;
}

function mapEventToMarker(event, overrides = {}) {
  const colorData = getEventColorData(event.id);

  return {
    id: event.id,
    type: "EVENT",
    title: event.title,
    entityName: event.entity ? event.entity.organizationName : overrides.entityName,
    startsAt: event.startsAt,
    endsAt: event.endsAt,
    startsAtLabel: formatEventDateRange(event),
    publicationStatus: event.publicationStatus,
    address: event.address,
    normalizedAddress: event.normalizedAddress || event.address,
    latitude: toNumber(event.latitude),
    longitude: toNumber(event.longitude),
    url: `/eventos/${event.id}`,
    detailUrl: `/eventos/${event.id}`,
    colorClass: colorData.colorClass,
    markerColor: colorData.markerColor,
    markerTextColor: colorData.markerTextColor,
    ...overrides,
  };
}

function mapEntityToMarker(entity, overrides = {}) {
  const requester = entity.requestedByUser;

  return {
    id: entity.id,
    type: "ENTITY",
    name: entity.organizationName,
    validationStatus: entity.validationStatus,
    contactEmail: entity.contactEmail,
    requesterName: requester
      ? `${requester.firstName} ${requester.lastName}`.trim()
      : undefined,
    requesterEmail: requester ? requester.email : undefined,
    address: entity.address,
    normalizedAddress: entity.normalizedAddress || entity.address,
    latitude: toNumber(entity.latitude),
    longitude: toNumber(entity.longitude),
    url: `/admin/entidades/${entity.id}`,
    ...overrides,
  };
}

module.exports = {
  hasCoordinates,
  mapEntityToMarker,
  mapEventToMarker,
};
