const express = require("express");

const accountDeletionController = require("../../controllers/accounts/account-deletion.controller");
const entityCalendarController = require("../../controllers/entities/entity-calendar.controller");
const entityHistoryController = require("../../controllers/entities/entity-history.controller");
const entityMapController = require("../../controllers/maps/entity-map.controller");
const entityProfileController = require("../../controllers/entities/entity-profile.controller");
const entityPublicRegistrationController = require("../../controllers/entities/entity-public-registration.controller");
const entitySubscriptionController = require("../../controllers/entities/entity-subscription.controller");
const entityRegistrationController = require("../../controllers/entities/entity-registration.controller");
const entityStatusController = require("../../controllers/entities/entity-status.controller");
const {
  requireAuth,
  requireRole,
  requireVerifiedEntity,
} = require("../../middlewares/auth.middleware");

const router = express.Router();

router.get(
  "/entidad/eliminar-cuenta",
  requireAuth,
  requireRole("ENTIDAD"),
  accountDeletionController.renderEntityAccountDeletion,
);
router.post(
  "/entidad/eliminar-cuenta",
  requireAuth,
  requireRole("ENTIDAD"),
  accountDeletionController.deleteEntityAccountAction,
);
router.get(
  "/entidad/calendario",
  requireAuth,
  requireRole("ENTIDAD"),
  requireVerifiedEntity(),
  entityCalendarController.renderEntityCalendar,
);
router.get(
  "/entidad/historial",
  requireAuth,
  requireRole("ENTIDAD"),
  requireVerifiedEntity(),
  entityHistoryController.renderEntityHistory,
);
router.get(
  "/entidad/mapa",
  requireAuth,
  requireRole("ENTIDAD"),
  requireVerifiedEntity(),
  entityMapController.renderEntityMap,
);
router.get(
  "/entidades/registro",
  entityPublicRegistrationController.renderEntityPublicRegistrationForm,
);
router.post(
  "/entidades/registro",
  entityPublicRegistrationController.submitEntityPublicRegistration,
);
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
  requireVerifiedEntity(),
  entityProfileController.renderEntityProfile,
);
router.post(
  "/entidad/perfil",
  requireAuth,
  requireRole("ENTIDAD"),
  requireVerifiedEntity(),
  entityProfileController.updateEntityProfileAction,
);
router.get(
  "/entidad/estado",
  requireAuth,
  requireRole("ENTIDAD"),
  entityStatusController.renderEntityStatus,
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
