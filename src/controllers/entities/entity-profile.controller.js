const prisma = require("../../config/prisma");
const updateEntityProfile = require("../../services/entities/update-entity-profile.service");
const {
  validateEntityProfileInput,
} = require("../../validators/entities/entity-profile.validator");

function buildViewModel(overrides = {}) {
  return {
    pageTitle: "Perfil de entidad",
    formData: {
      organizationName: "",
      legalName: "",
      taxId: "",
      contactEmail: "",
      contactPhone: "",
      city: "",
      address: "",
      latitude: "",
      longitude: "",
      normalizedAddress: "",
      description: "",
      supportingInfo: "",
      validationStatus: "",
    },
    errors: {},
    successMessage: null,
    ...overrides,
  };
}

async function renderEntityProfile(req, res, next) {
  try {
    const entity = await prisma.entity.findUnique({
      where: {
        requestedByUserId: req.currentUser.id,
      },
    });

    if (!entity) {
      return res.status(404).render("pages/errors/404", {
        pageTitle: "Entidad no encontrada",
      });
    }

    const successMessage =
      req.query.updated === "1"
        ? "La informacion visible de la entidad se ha actualizado correctamente."
        : null;

    return res.render(
      "pages/entities/profile",
      buildViewModel({
        formData: {
          organizationName: entity.organizationName,
          legalName: entity.legalName,
          taxId: entity.taxId,
          contactEmail: entity.contactEmail,
          contactPhone: entity.contactPhone,
          city: entity.city,
          address: entity.address,
          latitude: entity.latitude ? String(entity.latitude) : "",
          longitude: entity.longitude ? String(entity.longitude) : "",
          normalizedAddress: entity.normalizedAddress || "",
          description: entity.description,
          supportingInfo: entity.supportingInfo || "",
          validationStatus: entity.validationStatus,
        },
        successMessage,
      }),
    );
  } catch (error) {
    return next(error);
  }
}

async function updateEntityProfileAction(req, res, next) {
  const { sanitizedData, errors } = validateEntityProfileInput(req.body);

  if (Object.keys(errors).length > 0) {
    try {
      const currentEntity = await prisma.entity.findUnique({
        where: {
          requestedByUserId: req.currentUser.id,
        },
      });

      if (!currentEntity) {
        return res.status(404).render("pages/errors/404", {
          pageTitle: "Entidad no encontrada",
        });
      }

      return res.status(422).render(
        "pages/entities/profile",
        buildViewModel({
          formData: {
            ...sanitizedData,
            legalName: currentEntity.legalName,
            taxId: currentEntity.taxId,
            validationStatus: currentEntity.validationStatus,
          },
          errors,
        }),
      );
    } catch (error) {
      return next(error);
    }
  }

  try {
    await updateEntityProfile({
      userId: req.currentUser.id,
      organizationName: sanitizedData.organizationName,
      contactEmail: sanitizedData.contactEmail,
      contactPhone: sanitizedData.contactPhone,
      city: sanitizedData.city,
      address: sanitizedData.address,
      latitude: sanitizedData.latitude,
      longitude: sanitizedData.longitude,
      normalizedAddress: sanitizedData.normalizedAddress,
      description: sanitizedData.description,
      supportingInfo: sanitizedData.supportingInfo,
    });

    return res.redirect("/entidad/perfil?updated=1");
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  renderEntityProfile,
  updateEntityProfileAction,
};
