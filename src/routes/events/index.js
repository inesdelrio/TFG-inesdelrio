const express = require("express");

const eventManagementController = require("../../controllers/events/event-management.controller");
const eventPublicationController = require("../../controllers/events/event-publication.controller");
const { requireAuth, requireRole } = require("../../middlewares/auth.middleware");

const router = express.Router();

router.get("/eventos", eventPublicationController.renderPublicEventsList);
router.get(
  "/eventos/nuevo",
  requireAuth,
  requireRole("ENTIDAD"),
  eventPublicationController.renderEventCreationForm,
);
router.post(
  "/eventos",
  requireAuth,
  requireRole("ENTIDAD"),
  eventPublicationController.publishEvent,
);
router.get(
  "/eventos/:eventId/editar",
  requireAuth,
  requireRole("ENTIDAD"),
  eventManagementController.renderEventEditForm,
);
router.post(
  "/eventos/:eventId",
  requireAuth,
  requireRole("ENTIDAD"),
  eventManagementController.updateEvent,
);
router.post(
  "/eventos/:eventId/eliminar",
  requireAuth,
  requireRole("ENTIDAD"),
  eventManagementController.deleteEvent,
);
router.get("/eventos/:eventId", eventPublicationController.renderEventDetail);

module.exports = router;
