const createEntityRegistration = require("../../services/entities/create-entity-registration.service");
const {
  validateEntityPublicRegistrationInput,
} = require("../../validators/entities/entity-public-registration.validator");

function buildViewModel(overrides = {}) {
  return {
    pageTitle: "Registro de entidad",
    formData: {
      firstName: "",
      lastName: "",
      email: "",
      organizationName: "",
      taxId: "",
      contactPhone: "",
      address: "",
      latitude: "",
      longitude: "",
      normalizedAddress: "",
      description: "",
      supportingInfo: "",
    },
    errors: {},
    ...overrides,
  };
}

function renderEntityPublicRegistrationForm(req, res) {
  if (req.currentUser) {
    return res.redirect("/entidad/estado");
  }

  return res.render("pages/entities/public-register", buildViewModel());
}

async function submitEntityPublicRegistration(req, res, next) {
  if (req.currentUser) {
    return res.redirect("/entidad/estado");
  }

  const { sanitizedData, errors } = validateEntityPublicRegistrationInput(req.body);

  if (Object.keys(errors).length > 0) {
    return res.status(422).render(
      "pages/entities/public-register",
      buildViewModel({
        formData: sanitizedData,
        errors,
      }),
    );
  }

  try {
    await createEntityRegistration({
      ...sanitizedData,
      password: req.body.password,
    });

    return res.redirect(
      `/login?entityRequested=1&email=${encodeURIComponent(sanitizedData.email)}`,
    );
  } catch (error) {
    if (error.code === "EMAIL_ALREADY_EXISTS") {
      return res.status(409).render(
        "pages/entities/public-register",
        buildViewModel({
          formData: sanitizedData,
          errors: {
            email: "Ya existe una cuenta registrada con ese email.",
          },
        }),
      );
    }

    if (error.code === "ENTITY_TAX_ID_ALREADY_EXISTS") {
      return res.status(409).render(
        "pages/entities/public-register",
        buildViewModel({
          formData: sanitizedData,
          errors: {
            taxId: "Ya existe una entidad registrada con ese CIF/NIF.",
          },
        }),
      );
    }

    return next(error);
  }
}

module.exports = {
  renderEntityPublicRegistrationForm,
  submitEntityPublicRegistration,
};
