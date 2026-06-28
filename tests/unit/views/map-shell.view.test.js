const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

function testMapShellIncludesEventListPanel() {
  const template = fs.readFileSync(
    path.join(__dirname, "../../../src/views/partials/map-shell.ejs"),
    "utf8",
  );

  assert.ok(template.includes("Eventos en el mapa"));
  assert.ok(template.includes("Selecciona un evento para localizarlo en el mapa."));
  assert.ok(template.includes("map-events-list-section"));
  assert.ok(template.includes("data-map-events-list"));
  assert.ok(template.includes("map-selected-section"));
  assert.ok(template.includes("data-selected-map-item"));
  assert.ok(template.includes("Evento seleccionado"));
}

module.exports = {
  testMapShellIncludesEventListPanel,
};
