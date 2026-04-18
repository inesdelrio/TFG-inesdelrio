const authenticateUser = require("../../services/auth/authenticate-user.service");
const { destroyUserSession } = require("../../services/auth/session.service");
const { getRedirectPathForRole } = require("../../utils/auth-redirect");
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
      ? "Tu cuenta ya esta creada. Inicia sesion con tu email y contraseña."
      : null;

  return res.render("pages/auth/login", buildLoginViewModel({ infoMessage }));
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

    return req.session.save((saveError) => {
      if (saveError) {
        return next(saveError);
      }

      return res.redirect(getRedirectPathForRole(user.role));
    });
  } catch (error) {
    if (error.code === "INVALID_CREDENTIALS") {
      return res.status(401).render(
        "pages/auth/login",
        buildLoginViewModel({
          formData: sanitizedData,
          errors: {
            credentials: "Email o contraseña incorrectos.",
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
