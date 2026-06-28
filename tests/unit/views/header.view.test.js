const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

function readHeaderTemplate() {
  return fs.readFileSync(
    path.join(__dirname, "../../../src/views/partials/header.ejs"),
    "utf8",
  );
}

function testHeaderVolunteerUsesEventsDropdown() {
  const template = readHeaderTemplate();

  assert.ok(template.includes('class="nav-dropdown"'));
  assert.ok(template.includes('class="nav-dropdown-toggle"'));
  assert.ok(template.includes("Eventos"));
  assert.ok(template.includes('href="/eventos"'));
  assert.ok(template.includes('href="/eventos/mapa"'));
  assert.ok(template.includes('href="/voluntariado/calendario"'));
  assert.equal((template.match(/href="\/eventos\/mapa"/g) || []).length, 1);
  assert.equal((template.match(/href="\/voluntariado\/calendario"/g) || []).length, 1);
  assert.ok(template.includes('<a href="/entidad/mapa">Mapa</a>'));
  assert.ok(template.includes('<a href="/admin/mapa">Mapa</a>'));
}

module.exports = {
  testHeaderVolunteerUsesEventsDropdown,
};
