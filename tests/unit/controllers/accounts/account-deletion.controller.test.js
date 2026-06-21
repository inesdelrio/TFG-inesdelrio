const assert = require("node:assert/strict");

const {
  deleteVolunteerAccountAction,
  renderVolunteerAccountDeletion,
} = require("../../../../src/controllers/accounts/account-deletion.controller");

function createResponseRecorder() {
  return {
    redirectedTo: null,
    renderedModel: null,
    renderedView: null,
    statusCode: 200,
    redirect(path) {
      this.redirectedTo = path;
      return this;
    },
    render(view, model) {
      this.renderedView = view;
      this.renderedModel = model;
      return this;
    },
    status(code) {
      this.statusCode = code;
      return this;
    },
  };
}

function testRenderVolunteerAccountDeletionShowsConfirmation() {
  const res = createResponseRecorder();

  renderVolunteerAccountDeletion({}, res);

  assert.equal(res.renderedView, "pages/accounts/delete-confirmation");
  assert.equal(res.renderedModel.actionPath, "/voluntariado/eliminar-cuenta");
}

async function testDeleteVolunteerAccountActionRequiresConfirmation() {
  const res = createResponseRecorder();
  let serviceCalled = false;

  await deleteVolunteerAccountAction(
    {
      body: { confirmation: "eliminar" },
      currentUser: { id: 8, role: "VOLUNTARIO" },
    },
    res,
    (error) => {
      throw error;
    },
    {
      deleteVolunteerAccount: async () => {
        serviceCalled = true;
      },
    },
  );

  assert.equal(serviceCalled, false);
  assert.equal(res.statusCode, 422);
  assert.equal(res.renderedView, "pages/accounts/delete-confirmation");
}

async function testDeleteVolunteerAccountActionDestroysSessionAndRedirects() {
  const res = createResponseRecorder();
  let deletedUserId = null;
  let sessionDestroyed = false;

  await deleteVolunteerAccountAction(
    {
      body: { confirmation: "ELIMINAR" },
      currentUser: { id: 8, role: "VOLUNTARIO" },
    },
    res,
    (error) => {
      throw error;
    },
    {
      deleteVolunteerAccount: async ({ userId }) => {
        deletedUserId = userId;
      },
      destroyUserSession: (req, callback) => {
        sessionDestroyed = true;
        callback(null);
      },
    },
  );

  assert.equal(deletedUserId, 8);
  assert.equal(sessionDestroyed, true);
  assert.equal(res.redirectedTo, "/login?deleted=1");
}

module.exports = {
  testDeleteVolunteerAccountActionDestroysSessionAndRedirects,
  testDeleteVolunteerAccountActionRequiresConfirmation,
  testRenderVolunteerAccountDeletionShowsConfirmation,
};
