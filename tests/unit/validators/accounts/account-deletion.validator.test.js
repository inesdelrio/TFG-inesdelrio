const assert = require("node:assert/strict");

const {
  validateAccountDeletion,
} = require("../../../../src/validators/accounts/account-deletion.validator");

function testValidateAccountDeletionRequiresExactConfirmation() {
  assert.deepEqual(validateAccountDeletion({ confirmation: "ELIMINAR" }).errors, {});
  assert.ok(
    validateAccountDeletion({ confirmation: "eliminar" }).errors.confirmation,
  );
  assert.ok(validateAccountDeletion({ confirmation: "" }).errors.confirmation);
}

module.exports = {
  testValidateAccountDeletionRequiresExactConfirmation,
};
