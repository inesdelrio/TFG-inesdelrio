const assert = require("node:assert/strict");

const {
  validateVolunteerRegistrationInput,
} = require("../../../../src/validators/auth/register-volunteer.validator");

function testValidateVolunteerRegistrationInputRejectsInvalidData() {
  const result = validateVolunteerRegistrationInput({
    firstName: "I",
    lastName: "",
    email: "correo-invalido",
    phone: "abc",
    password: "123",
    passwordConfirm: "456",
  });

  assert.ok(result.errors.firstName);
  assert.ok(result.errors.lastName);
  assert.ok(result.errors.email);
  assert.ok(result.errors.phone);
  assert.ok(result.errors.password);
  assert.ok(result.errors.passwordConfirm);
}

module.exports = {
  testValidateVolunteerRegistrationInputRejectsInvalidData,
};
