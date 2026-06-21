const deleteEntityAccount = require("../../services/accounts/delete-entity-account.service");
const deleteVolunteerAccount = require("../../services/accounts/delete-volunteer-account.service");
const { destroyUserSession } = require("../../services/auth/session.service");
const {
  validateAccountDeletion,
} = require("../../validators/accounts/account-deletion.validator");

function buildDeletionViewModel(type, overrides = {}) {
  const isEntity = type === "ENTIDAD";

  return {
    pageTitle: "Eliminar cuenta",
    accountType: type,
    actionPath: isEntity
      ? "/entidad/eliminar-cuenta"
      : "/voluntariado/eliminar-cuenta",
    cancelPath: isEntity ? "/entidad/perfil" : "/voluntariado/perfil",
    errors: {},
    confirmation: "",
    ...overrides,
  };
}

function renderVolunteerAccountDeletion(req, res) {
  return res.render(
    "pages/accounts/delete-confirmation",
    buildDeletionViewModel("VOLUNTARIO"),
  );
}

function renderEntityAccountDeletion(req, res) {
  return res.render(
    "pages/accounts/delete-confirmation",
    buildDeletionViewModel("ENTIDAD"),
  );
}

function deleteAccountAction(type) {
  return async (req, res, next, dependencies = {}) => {
    const validation = validateAccountDeletion(req.body);

    if (Object.keys(validation.errors).length > 0) {
      return res.status(422).render(
        "pages/accounts/delete-confirmation",
        buildDeletionViewModel(type, validation),
      );
    }

    const deleteAccount =
      type === "ENTIDAD"
        ? dependencies.deleteEntityAccount || deleteEntityAccount
        : dependencies.deleteVolunteerAccount || deleteVolunteerAccount;
    const destroySession =
      dependencies.destroyUserSession || destroyUserSession;

    try {
      await deleteAccount({
        userId: req.currentUser.id,
      });

      return destroySession(req, (error) => {
        if (error) {
          return next(error);
        }

        return res.redirect("/login?deleted=1");
      });
    } catch (error) {
      return next(error);
    }
  };
}

const deleteVolunteerAccountAction = deleteAccountAction("VOLUNTARIO");
const deleteEntityAccountAction = deleteAccountAction("ENTIDAD");

module.exports = {
  deleteEntityAccountAction,
  deleteVolunteerAccountAction,
  renderEntityAccountDeletion,
  renderVolunteerAccountDeletion,
};
