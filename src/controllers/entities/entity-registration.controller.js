const createEntityRequest = require("../../services/entities/create-entity-request.service");
const {
  validateEntityRegistrationInput,
} = require("../../validators/entities/entity-registration.validator");

function buildViewModel(overrides = {}) {
  return {
    pageTitle: "Solicitud de alta de entidad",
    formData: {
      organizationName: "",
      legalName: "",
      taxId: "",
      contactEmail: "",
      contactPhone: "",
      city: "",
      address: "",
      description: "",
      supportingInfo: "",
    },
    errors: {},
    ...overrides,
  };
}

function renderEntityRegistrationForm(req, res) {
  return res.render("pages/entities/register", buildViewModel());
}

async function submitEntityRegistration(req, res, next) {
  const { sanitizedData, errors } = validateEntityRegistrationInput(req.body);

  if (Object.keys(errors).length > 0) {
    return res.status(422).render(
      "pages/entities/register",
      buildViewModel({
        formData: sanitizedData,
        errors,
      }),
    );
  }

  try {
    const entity = await createEntityRequest({
      userId: req.currentUser.id,
      organizationName: sanitizedData.organizationName,
      legalName: sanitizedData.legalName,
      taxId: sanitizedData.taxId,
      contactEmail: sanitizedData.contactEmail,
      contactPhone: sanitizedData.contactPhone,
      city: sanitizedData.city,
      address: sanitizedData.address,
      description: sanitizedData.description,
      supportingInfo: sanitizedData.supportingInfo,
    });

    req.session.user = {
      ...req.session.user,
      role: "ENTIDAD",
    };

    return req.session.save((saveError) => {
      if (saveError) {
        return next(saveError);
      }

      return res.redirect(`/entidad/area?requested=1&entityId=${entity.id}`);
    });
  } catch (error) {
    if (error.code === "ENTITY_ALREADY_EXISTS_FOR_USER") {
      return res.status(409).render(
        "pages/entities/register",
        buildViewModel({
          formData: sanitizedData,
          errors: {
            general: "Tu usuario ya tiene una solicitud de entidad asociada.",
          },
        }),
      );
    }

    if (error.code === "ENTITY_TAX_ID_ALREADY_EXISTS") {
      return res.status(409).render(
        "pages/entities/register",
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
  renderEntityRegistrationForm,
  submitEntityRegistration,
};
