const express = require("express");

const volunteerNotificationController = require("../../controllers/notifications/volunteer-notification.controller");
const { requireAuth, requireRole } = require("../../middlewares/auth.middleware");

const router = express.Router();

router.get(
  "/notificaciones",
  requireAuth,
  requireRole("VOLUNTARIO"),
  volunteerNotificationController.renderVolunteerNotifications,
);

router.post(
  "/notificaciones/:notificationId/leida",
  requireAuth,
  requireRole("VOLUNTARIO"),
  volunteerNotificationController.markVolunteerNotificationAsRead,
);

module.exports = router;
