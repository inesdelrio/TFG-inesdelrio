const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

function testMapShellIncludesSelectedItemCard() {
  const template = fs.readFileSync(
    path.join(__dirname, "../../../src/views/partials/map-shell.ejs"),
    "utf8",
  );

  assert.ok(template.includes("data-selected-map-item"));
  assert.ok(template.includes("Evento seleccionado"));
  assert.ok(template.includes("Selecciona un evento en el mapa"));
}

module.exports = {
  testMapShellIncludesSelectedItemCard,
};
