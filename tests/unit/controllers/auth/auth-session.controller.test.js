const assert = require("node:assert/strict");

const { renderLoginForm } = require("../../../../src/controllers/auth/auth-session.controller");

function testRenderLoginFormShowsRegisteredMessageAndPrefillsEmail() {
  const renderCalls = [];
  const req = {
    currentUser: null,
    query: {
      registered: "1",
      email: "ines@example.com",
    },
  };
  const res = {
    render: (view, model) => {
      renderCalls.push({ view, model });
    },
  };

  renderLoginForm(req, res);

  assert.equal(renderCalls.length, 1);
  assert.equal(renderCalls[0].view, "pages/auth/login");
  assert.equal(
    renderCalls[0].model.infoMessage,
    "Cuenta creada correctamente. Ya puedes iniciar sesion.",
  );
  assert.equal(renderCalls[0].model.formData.email, "ines@example.com");
}

module.exports = {
  testRenderLoginFormShowsRegisteredMessageAndPrefillsEmail,
};
