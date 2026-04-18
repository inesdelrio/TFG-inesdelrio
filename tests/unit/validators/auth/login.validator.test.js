const assert = require("node:assert/strict");

const { validateLoginInput } = require("../../../../src/validators/auth/login.validator");

function testValidateLoginInputRejectsInvalidData() {
  const result = validateLoginInput({
    email: "correo-invalido",
    password: "",
  });

  assert.ok(result.errors.email);
  assert.ok(result.errors.password);
}

module.exports = {
  testValidateLoginInputRejectsInvalidData,
};
