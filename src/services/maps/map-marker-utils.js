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

function hasCoordinates(record) {
  return toNumber(record.latitude) !== null && toNumber(record.longitude) !== null;
}

function mapEventToMarker(event, overrides = {}) {
  return {
    id: event.id,
    type: "EVENT",
    title: event.title,
    entityName: event.entity ? event.entity.organizationName : overrides.entityName,
    startsAt: event.startsAt,
    startsAtLabel: formatDateTime(event.startsAt),
    publicationStatus: event.publicationStatus,
    address: event.address,
    normalizedAddress: event.normalizedAddress || event.address,
    latitude: toNumber(event.latitude),
    longitude: toNumber(event.longitude),
    url: `/eventos/${event.id}`,
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
