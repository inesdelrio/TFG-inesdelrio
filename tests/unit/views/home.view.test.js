const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

function readHomeTemplate() {
  return fs.readFileSync(
    path.join(__dirname, "../../../src/views/pages/home/index.ejs"),
    "utf8",
  );
}

function testHomeKeepsNeutralEventsLinkOnly() {
  const template = readHomeTemplate();

  assert.ok(template.includes("<h1>VolunRed</h1>"));
  assert.ok(template.includes("Conectando personas con ganas de ayudar"));
  assert.ok(template.includes('href="/eventos"'));
  assert.ok(template.includes("Ver eventos"));
  assert.ok(!template.includes('href="/registro"'));
  assert.ok(!template.includes('href="/login"'));
  assert.ok(!template.includes(">Registrarse<"));
  assert.ok(!template.includes(">Iniciar sesion<"));
}

module.exports = {
  testHomeKeepsNeutralEventsLinkOnly,
};
