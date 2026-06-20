const express = require("express");

const entityProfileController = require("../../controllers/entities/entity-profile.controller");
const entitySubscriptionController = require("../../controllers/entities/entity-subscription.controller");
const entityRegistrationController = require("../../controllers/entities/entity-registration.controller");
const { requireAuth, requireRole } = require("../../middlewares/auth.middleware");

const router = express.Router();

router.get(
  "/entidades/solicitud",
  requireAuth,
  requireRole("VOLUNTARIO"),
  entityRegistrationController.renderEntityRegistrationForm,
);
router.post(
  "/entidades/solicitud",
  requireAuth,
  requireRole("VOLUNTARIO"),
  entityRegistrationController.submitEntityRegistration,
);
router.get(
  "/entidad/perfil",
  requireAuth,
  requireRole("ENTIDAD"),
  entityProfileController.renderEntityProfile,
);
router.post(
  "/entidad/perfil",
  requireAuth,
  requireRole("ENTIDAD"),
  entityProfileController.updateEntityProfileAction,
);
router.post(
  "/entidades/:entityId/suscribirse",
  requireAuth,
  requireRole("VOLUNTARIO"),
  entitySubscriptionController.subscribeToEntity,
);
router.post(
  "/entidades/:entityId/dejar-de-seguir",
  requireAuth,
  requireRole("VOLUNTARIO"),
  entitySubscriptionController.unsubscribeFromEntity,
);

module.exports = router;
