const registerVolunteerService = require("../../services/auth/register-volunteer.service");
const {
  validateVolunteerRegistrationInput,
} = require("../../validators/auth/register-volunteer.validator");

function buildViewModel(overrides = {}) {
  return {
    pageTitle: "Registro de voluntario",
    formData: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
    errors: {},
    successMessage: null,
    ...overrides,
  };
}

function renderRegisterVolunteerForm(req, res) {
  if (req.currentUser) {
    return res.redirect("/voluntariado/area");
  }

  const successMessage =
    req.query.registered === "1"
      ? "Tu cuenta de voluntario se ha creado correctamente. Ya puedes iniciar sesion."
      : null;

  res.render("pages/auth/register", buildViewModel({ successMessage }));
}

async function registerVolunteer(req, res, next) {
  const { sanitizedData, errors } = validateVolunteerRegistrationInput(req.body);

  if (Object.keys(errors).length > 0) {
    return res.status(422).render(
      "pages/auth/register",
      buildViewModel({
        errors,
        formData: sanitizedData,
      }),
    );
  }

  try {
    await registerVolunteerService({
      firstName: sanitizedData.firstName,
      lastName: sanitizedData.lastName,
      email: sanitizedData.email,
      phone: sanitizedData.phone,
      password: req.body.password,
    });

    return res.redirect("/registro?registered=1");
  } catch (error) {
    if (error.code === "EMAIL_ALREADY_EXISTS") {
      return res.status(409).render(
        "pages/auth/register",
        buildViewModel({
          errors: {
            email: "Ya existe una cuenta registrada con ese email.",
          },
          formData: sanitizedData,
        }),
      );
    }

    return next(error);
  }
}

module.exports = {
  registerVolunteer,
  renderRegisterVolunteerForm,
};
