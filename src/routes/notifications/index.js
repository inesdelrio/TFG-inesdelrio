const express = require("express");

const notificationController = require("../../controllers/notifications/notification.controller");
const { requireAuth, requireRole } = require("../../middlewares/auth.middleware");

const router = express.Router();

router.get(
  "/notificaciones",
  requireAuth,
  requireRole("VOLUNTARIO", "ENTIDAD"),
  notificationController.renderNotifications,
);

router.get(
  "/notificaciones/:notificationId",
  requireAuth,
  requireRole("VOLUNTARIO", "ENTIDAD"),
  notificationController.renderNotificationDetail,
);

router.post(
  "/notificaciones/:notificationId/leida",
  requireAuth,
  requireRole("VOLUNTARIO", "ENTIDAD"),
  notificationController.markNotificationAsReadAction,
);

router.post(
  "/notificaciones/:notificationId/no-leida",
  requireAuth,
  requireRole("VOLUNTARIO", "ENTIDAD"),
  notificationController.markNotificationAsUnreadAction,
);

router.post(
  "/notificaciones/:notificationId/abrir",
  requireAuth,
  requireRole("VOLUNTARIO", "ENTIDAD"),
  notificationController.openNotificationEvent,
);

router.post(
  "/notificaciones/:notificationId/eliminar",
  requireAuth,
  requireRole("VOLUNTARIO", "ENTIDAD"),
  notificationController.deleteNotificationAction,
);

module.exports = router;
