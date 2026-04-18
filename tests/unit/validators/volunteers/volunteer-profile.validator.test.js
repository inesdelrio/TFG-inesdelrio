const assert = require("node:assert/strict");

const {
  validateVolunteerProfileInput,
} = require("../../../../src/validators/volunteers/volunteer-profile.validator");

function testValidateVolunteerProfileInputRejectsInvalidData() {
  const result = validateVolunteerProfileInput({
    firstName: "I",
    lastName: "",
    phone: "abc",
  });

  assert.ok(result.errors.firstName);
  assert.ok(result.errors.lastName);
  assert.ok(result.errors.phone);
}

module.exports = {
  testValidateVolunteerProfileInputRejectsInvalidData,
};
