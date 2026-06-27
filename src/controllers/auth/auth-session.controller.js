const authenticateUser = require("../../services/auth/authenticate-user.service");
const { destroyUserSession } = require("../../services/auth/session.service");
const {
  getEntityLoginRedirectPath,
  getRedirectPathForRole,
} = require("../../utils/auth-redirect");
const { validateLoginInput } = require("../../validators/auth/login.validator");

function buildLoginViewModel(overrides = {}) {
  return {
    pageTitle: "Inicio de sesion",
    formData: {
      email: "",
    },
    errors: {},
    infoMessage: null,
    ...overrides,
  };
}

function renderLoginForm(req, res) {
  if (req.currentUser) {
    return res.redirect(getRedirectPathForRole(req.currentUser.role));
  }

  const infoMessage =
    req.query.registered === "1"
      ? "Cuenta creada correctamente. Ya puedes iniciar sesion."
      : req.query.entityRequested === "1"
        ? "Solicitud de entidad enviada. Un administrador debe validar la cuenta antes de que pueda publicar eventos."
      : req.query.deleted === "1"
        ? "La cuenta se ha eliminado definitivamente."
      : null;
  const email = typeof req.query.email === "string" ? req.query.email : "";

  return res.render(
    "pages/auth/login",
    buildLoginViewModel({
      infoMessage,
      formData: {
        email,
      },
    }),
  );
}

async function loginUser(req, res, next) {
  const { sanitizedData, errors } = validateLoginInput(req.body);

  if (Object.keys(errors).length > 0) {
    return res.status(422).render(
      "pages/auth/login",
      buildLoginViewModel({
        formData: sanitizedData,
        errors,
      }),
    );
  }

  try {
    const user = await authenticateUser({
      email: sanitizedData.email,
      password: req.body.password,
    });

    req.session.user = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    };

    const redirectPath = await getEntityLoginRedirectPath(user);

    return req.session.save((saveError) => {
      if (saveError) {
        return next(saveError);
      }

      return res.redirect(redirectPath);
    });
  } catch (error) {
    if (error.code === "INVALID_CREDENTIALS") {
      return res.status(401).render(
        "pages/auth/login",
        buildLoginViewModel({
          formData: sanitizedData,
          errors: {
            credentials: "Email o contrasena incorrectos.",
          },
        }),
      );
    }

    return next(error);
  }
}

function logoutUser(req, res, next) {
  return destroyUserSession(req, (error) => {
    if (error) {
      return next(error);
    }

    return res.redirect("/login");
  });
}

module.exports = {
  loginUser,
  logoutUser,
  renderLoginForm,
};
