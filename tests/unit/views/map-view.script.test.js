const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

function readMapScript() {
  return fs.readFileSync(
    path.join(__dirname, "../../../public/js/map-view.js"),
    "utf8",
  );
}

function testMapViewScriptBuildsEventListPanel() {
  const script = readMapScript();

  assert.ok(!script.includes(".bindTooltip("));
  assert.ok(!script.includes(".bindPopup("));
  assert.ok(!script.includes("title: marker.type"));
  assert.ok(script.includes("L.circleMarker"));
  assert.ok(script.includes("L.divIcon"));
  assert.ok(script.includes("map-event-marker-icon"));
  assert.ok(script.includes("renderMapEventList"));
  assert.ok(script.includes("selectMapEvent"));
  assert.ok(script.includes("eventMarkersById"));
  assert.ok(script.includes("map.setView([item.latitude, item.longitude], 16)"));
  assert.ok(script.includes("selectedMarker.circleMarker.setStyle"));
  assert.ok(script.includes(".addTo(map)"));
  assert.ok(script.includes("fillOpacity: 0.85"));
  assert.ok(script.includes("opacity: 1"));
  assert.ok(script.includes("item.availableSlots"));
  assert.ok(script.includes("item.registrationState"));
  assert.ok(script.includes("item.detailUrl"));
  assert.ok(script.includes("Ver detalles e inscribirme"));
  assert.ok(script.includes("Ver detalles"));
}

function testMapViewScriptUsesMarkerPastelColor() {
  const script = readMapScript();

  assert.ok(script.includes("item.markerColor"));
  assert.ok(script.includes("item.markerTextColor"));
}

module.exports = {
  testMapViewScriptBuildsEventListPanel,
  testMapViewScriptUsesMarkerPastelColor,
};
