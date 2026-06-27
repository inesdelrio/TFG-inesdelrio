const assert = require("node:assert/strict");

const {
  getEventColorData,
} = require("../../../../src/services/events/event-color.service");

function testGetEventColorDataReturnsStablePastelData() {
  const first = getEventColorData(7);
  const second = getEventColorData(7);

  assert.deepEqual(first, second);
  assert.equal(first.colorClass, "calendar-event-pastel-1");
  assert.match(first.markerColor, /^#[0-9a-f]{6}$/i);
}

function testGetEventColorDataHandlesMissingId() {
  const result = getEventColorData(null);

  assert.equal(result.colorClass, "calendar-event-pastel-0");
  assert.match(result.markerColor, /^#[0-9a-f]{6}$/i);
}

module.exports = {
  testGetEventColorDataHandlesMissingId,
  testGetEventColorDataReturnsStablePastelData,
};
