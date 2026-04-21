const express = require("express");

const eventAttendanceController = require("../../controllers/events/event-attendance.controller");
const eventRegistrationController = require("../../controllers/events/event-registration.controller");
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
router.get(
  "/eventos/:eventId/inscritos",
  requireAuth,
  requireRole("ENTIDAD"),
  eventAttendanceController.renderEventAttendees,
);
router.post(
  "/eventos/:eventId/inscribirse",
  requireAuth,
  requireRole("VOLUNTARIO"),
  eventRegistrationController.registerForEvent,
);
router.post(
  "/eventos/:eventId/cancelar-inscripcion",
  requireAuth,
  requireRole("VOLUNTARIO"),
  eventRegistrationController.cancelEventRegistration,
);
router.get("/eventos/:eventId", eventPublicationController.renderEventDetail);

module.exports = router;
