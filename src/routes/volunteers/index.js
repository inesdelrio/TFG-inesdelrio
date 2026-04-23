const express = require("express");

const volunteerCalendarController = require("../../controllers/volunteers/volunteer-calendar.controller");
const volunteerProfileController = require("../../controllers/volunteers/volunteer-profile.controller");
const { requireAuth, requireRole } = require("../../middlewares/auth.middleware");

const router = express.Router();

router.get(
  "/voluntariado/calendario",
  requireAuth,
  requireRole("VOLUNTARIO"),
  volunteerCalendarController.renderVolunteerCalendar,
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
