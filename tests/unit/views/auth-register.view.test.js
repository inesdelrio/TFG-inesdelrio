const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

function testVolunteerRegisterViewLinksToEntityRegistration() {
  const viewPath = path.join(
    __dirname,
    "../../../src/views/pages/auth/register.ejs",
  );
  const template = fs.readFileSync(viewPath, "utf8");

  assert.ok(template.includes('href="/entidades/registro"'));
  assert.ok(template.includes("¿Quieres registrar tu entidad?"));
}

module.exports = {
  testVolunteerRegisterViewLinksToEntityRegistration,
};
