const assert = require("node:assert/strict");

const { validateEventInput } = require("../../../../src/validators/events/event.validator");

function testValidateEventInputRejectsInvalidData() {
  const result = validateEventInput({
    title: "Abc",
    description: "Corta",
    address: "1234",
    startDate: "",
    endDate: "fecha-invalida",
    startTime: "10:00",
    endTime: "",
    totalSlots: "0",
  });

  assert.ok(result.errors.title);
  assert.ok(result.errors.description);
  assert.ok(result.errors.address);
  assert.ok(result.errors.startDate);
  assert.ok(result.errors.endDate);
  assert.ok(result.errors.endTime);
  assert.ok(result.errors.totalSlots);
}

function testValidateEventInputRejectsMissingMadridLocation() {
  const result = validateEventInput({
    title: "Recogida solidaria",
    description: "Descripcion suficientemente larga para publicar un evento.",
    city: "Madrid",
    address: "Calle Mayor 10",
    startDate: "2099-01-01",
    startTime: "10:00",
    endTime: "12:00",
    totalSlots: "10",
  });

  assert.ok(result.errors.latitude);
  assert.ok(result.errors.longitude);
  assert.ok(result.errors.normalizedAddress);
}

function testValidateEventInputAcceptsValidMadridLocation() {
  const result = validateEventInput({
    title: "Recogida solidaria",
    description: "Descripcion suficientemente larga para publicar un evento.",
    city: "Madrid",
    address: "Calle Mayor 10",
    startDate: "2099-01-01",
    endDate: "",
    startTime: "10:00",
    endTime: "12:00",
    totalSlots: "10",
    latitude: "40.416800",
    longitude: "-3.703800",
    normalizedAddress: "Calle Mayor 10, Madrid",
  });

  assert.deepEqual(result.errors, {});
  assert.equal(result.sanitizedData.city, "Madrid");
  assert.equal(result.sanitizedData.address, "Calle Mayor 10, Madrid");
  assert.equal(result.sanitizedData.latitude, 40.4168);
  assert.equal(result.sanitizedData.longitude, -3.7038);
  assert.equal(result.sanitizedData.normalizedAddress, "Calle Mayor 10, Madrid");
  assert.equal(result.sanitizedData.endDate, "2099-01-01");
  assert.equal(result.sanitizedData.startsAt.getTime(), new Date("2099-01-01T10:00:00").getTime());
  assert.equal(result.sanitizedData.endsAt.getTime(), new Date("2099-01-01T12:00:00").getTime());
}

function testValidateEventInputAcceptsMultiDayEvent() {
  const result = validateEventInput({
    title: "Recogida solidaria",
    description: "Descripcion suficientemente larga para publicar un evento.",
    startDate: "2099-01-01",
    endDate: "2099-01-03",
    startTime: "08:00",
    endTime: "10:00",
    totalSlots: "10",
    latitude: "40.416800",
    longitude: "-3.703800",
    normalizedAddress: "Calle Mayor 10, Madrid",
  });

  assert.deepEqual(result.errors, {});
  assert.equal(result.sanitizedData.startsAt.getTime(), new Date("2099-01-01T08:00:00").getTime());
  assert.equal(result.sanitizedData.endsAt.getTime(), new Date("2099-01-03T10:00:00").getTime());
}

function testValidateEventInputRejectsInvalidDateRange() {
  const result = validateEventInput({
    title: "Recogida solidaria",
    description: "Descripcion suficientemente larga para publicar un evento.",
    startDate: "2099-01-03",
    endDate: "2099-01-01",
    startTime: "08:00",
    endTime: "10:00",
    totalSlots: "10",
    latitude: "40.416800",
    longitude: "-3.703800",
    normalizedAddress: "Calle Mayor 10, Madrid",
  });

  assert.ok(result.errors.endDate);
}

function testValidateEventInputRejectsEndTimeBeforeStartTimeOnSameDay() {
  const result = validateEventInput({
    title: "Recogida solidaria",
    description: "Descripcion suficientemente larga para publicar un evento.",
    startDate: "2099-01-01",
    endDate: "2099-01-01",
    startTime: "10:00",
    endTime: "10:00",
    totalSlots: "10",
    latitude: "40.416800",
    longitude: "-3.703800",
    normalizedAddress: "Calle Mayor 10, Madrid",
  });

  assert.ok(result.errors.endTime);
}

function testValidateEventInputRejectsLongerThanThirtyDays() {
  const result = validateEventInput({
    title: "Recogida solidaria",
    description: "Descripcion suficientemente larga para publicar un evento.",
    startDate: "2099-01-01",
    endDate: "2099-02-01",
    startTime: "08:00",
    endTime: "10:00",
    totalSlots: "10",
    latitude: "40.416800",
    longitude: "-3.703800",
    normalizedAddress: "Calle Mayor 10, Madrid",
  });

  assert.ok(result.errors.endDate);
}

module.exports = {
  testValidateEventInputAcceptsMultiDayEvent,
  testValidateEventInputAcceptsValidMadridLocation,
  testValidateEventInputRejectsEndTimeBeforeStartTimeOnSameDay,
  testValidateEventInputRejectsInvalidData,
  testValidateEventInputRejectsInvalidDateRange,
  testValidateEventInputRejectsLongerThanThirtyDays,
  testValidateEventInputRejectsMissingMadridLocation,
};
