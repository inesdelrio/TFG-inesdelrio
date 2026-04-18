const prisma = require("../../config/prisma");
const updateVolunteerProfile = require("../../services/volunteers/update-volunteer-profile.service");
const {
  validateVolunteerProfileInput,
} = require("../../validators/volunteers/volunteer-profile.validator");

function buildViewModel(overrides = {}) {
  return {
    pageTitle: "Perfil de voluntario",
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

async function renderVolunteerProfile(req, res, next) {
  try {
    const volunteer = await prisma.user.findUnique({
      where: {
        id: req.currentUser.id,
      },
      select: {
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
      },
    });

    if (!volunteer) {
      return res.status(404).render("pages/errors/404", {
        pageTitle: "Perfil no encontrado",
      });
    }

    const successMessage =
      req.query.updated === "1"
        ? "Tus datos personales se han actualizado correctamente."
        : null;

    return res.render(
      "pages/volunteers/profile",
      buildViewModel({
        formData: {
          firstName: volunteer.firstName,
          lastName: volunteer.lastName,
          email: volunteer.email,
          phone: volunteer.phone || "",
        },
        successMessage,
      }),
    );
  } catch (error) {
    return next(error);
  }
}

async function updateVolunteerProfileAction(req, res, next) {
  const { sanitizedData, errors } = validateVolunteerProfileInput(req.body);

  if (Object.keys(errors).length > 0) {
    return res.status(422).render(
      "pages/volunteers/profile",
      buildViewModel({
        formData: {
          ...sanitizedData,
          email: req.currentUser.email,
        },
        errors,
      }),
    );
  }

  try {
    const updatedVolunteer = await updateVolunteerProfile({
      userId: req.currentUser.id,
      firstName: sanitizedData.firstName,
      lastName: sanitizedData.lastName,
      phone: sanitizedData.phone,
    });

    req.session.user = {
      ...req.session.user,
      firstName: updatedVolunteer.firstName,
      lastName: updatedVolunteer.lastName,
    };

    return req.session.save((saveError) => {
      if (saveError) {
        return next(saveError);
      }

      return res.redirect("/voluntariado/perfil?updated=1");
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  renderVolunteerProfile,
  updateVolunteerProfileAction,
};
