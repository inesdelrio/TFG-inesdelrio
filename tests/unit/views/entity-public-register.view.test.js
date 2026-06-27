const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

function testEntityPublicRegisterViewUsesSimplifiedFields() {
  const viewPath = path.join(
    __dirname,
    "../../../src/views/pages/entities/public-register.ejs",
  );
  const template = fs.readFileSync(viewPath, "utf8");

  assert.ok(template.includes("Datos de acceso"));
  assert.ok(template.includes("Dirección de la entidad en Madrid"));
  assert.ok(template.includes("Información adicional para la validación"));
  assert.ok(!template.includes("Telefono del responsable"));
  assert.ok(!template.includes("Razon social o nombre legal"));
  assert.ok(!template.includes('label for="city"'));
  assert.ok(!template.includes('label for="address"'));
}

module.exports = {
  testEntityPublicRegisterViewUsesSimplifiedFields,
};
