const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

function readMapScript() {
  return fs.readFileSync(
    path.join(__dirname, "../../../public/js/map-view.js"),
    "utf8",
  );
}

function testMapViewScriptBuildsExternalSelectedCard() {
  const script = readMapScript();

  assert.ok(!script.includes(".bindTooltip("));
  assert.ok(!script.includes(".bindPopup("));
  assert.ok(!script.includes("title: marker.type"));
  assert.ok(script.includes("L.circleMarker"));
  assert.ok(script.includes("showSelectedMapItem"));
  assert.ok(script.includes("selectedCard.hidden = false"));
  assert.ok(script.includes("marker.availableSlots"));
  assert.ok(script.includes("marker.registrationState"));
  assert.ok(script.includes("marker.detailUrl"));
  assert.ok(script.includes("Ver detalles e inscribirme"));
}

function testMapViewScriptUsesMarkerPastelColor() {
  const script = readMapScript();

  assert.ok(script.includes("marker.markerColor"));
  assert.ok(script.includes("marker.markerTextColor"));
}

module.exports = {
  testMapViewScriptBuildsExternalSelectedCard,
  testMapViewScriptUsesMarkerPastelColor,
};
