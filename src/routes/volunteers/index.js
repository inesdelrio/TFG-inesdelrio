const express = require("express");

const accountDeletionController = require("../../controllers/accounts/account-deletion.controller");
const volunteerCalendarController = require("../../controllers/volunteers/volunteer-calendar.controller");
const volunteerHistoryController = require("../../controllers/volunteers/volunteer-history.controller");
const volunteerProfileController = require("../../controllers/volunteers/volunteer-profile.controller");
const { requireAuth, requireRole } = require("../../middlewares/auth.middleware");

const router = express.Router();

router.get(
  "/voluntariado/eliminar-cuenta",
  requireAuth,
  requireRole("VOLUNTARIO"),
  accountDeletionController.renderVolunteerAccountDeletion,
);
router.post(
  "/voluntariado/eliminar-cuenta",
  requireAuth,
  requireRole("VOLUNTARIO"),
  accountDeletionController.deleteVolunteerAccountAction,
);
router.get(
  "/voluntariado/calendario",
  requireAuth,
  requireRole("VOLUNTARIO"),
  volunteerCalendarController.renderVolunteerCalendar,
);
router.get(
  "/voluntariado/historial",
  requireAuth,
  requireRole("VOLUNTARIO"),
  volunteerHistoryController.renderVolunteerHistory,
);
router.get(
  "/voluntariado/perfil",
  requireAuth,
  requireRole("VOLUNTARIO"),
  volunteerProfileController.renderVolunteerProfile,
);
router.post(
  "/voluntariado/perfil",
  requireAuth,
  requireRole("VOLUNTARIO"),
  volunteerProfileController.updateVolunteerProfileAction,
);

module.exports = router;
