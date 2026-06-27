const assert = require("node:assert/strict");

const {
  renderEntityPublicRegistrationForm,
} = require("../../../../src/controllers/entities/entity-public-registration.controller");

function testRenderEntityPublicRegistrationFormRendersPublicEntityForm() {
  const renderCalls = [];

  renderEntityPublicRegistrationForm(
    {
      currentUser: null,
    },
    {
      render(view, model) {
        renderCalls.push({ view, model });
      },
      redirect() {
        throw new Error("Public entity registration should not redirect anonymous users.");
      },
    },
  );

  assert.equal(renderCalls.length, 1);
  assert.equal(renderCalls[0].view, "pages/entities/public-register");
  assert.equal(renderCalls[0].model.pageTitle, "Registro de entidad");
}

module.exports = {
  testRenderEntityPublicRegistrationFormRendersPublicEntityForm,
};
