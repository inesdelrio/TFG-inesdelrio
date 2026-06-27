const assert = require("node:assert/strict");

const {
  renderAdminProfile,
} = require("../../../../src/controllers/admin/admin-profile.controller");

async function testRenderAdminProfileShowsCurrentAdminUser() {
  let renderedView = null;
  let renderedModel = null;

  await renderAdminProfile(
    {
      currentUser: {
        id: 2,
        firstName: "Admin",
        lastName: "VolunRed",
        email: "admin@volunred.test",
        phone: "600000000",
        role: "ADMIN",
      },
    },
    {
      render: (view, model) => {
        renderedView = view;
        renderedModel = model;
      },
    },
    (error) => {
      throw error;
    },
  );

  assert.equal(renderedView, "pages/admin/profile");
  assert.equal(renderedModel.pageTitle, "Perfil de administrador");
  assert.equal(renderedModel.admin.firstName, "Admin");
  assert.equal(renderedModel.admin.lastName, "VolunRed");
  assert.equal(renderedModel.admin.email, "admin@volunred.test");
  assert.equal(renderedModel.admin.phone, "600000000");
  assert.equal(renderedModel.admin.role, "ADMIN");
}

module.exports = {
  testRenderAdminProfileShowsCurrentAdminUser,
};
