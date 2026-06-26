const express = require("express");

const entityModerationController = require("../../controllers/admin/entity-moderation.controller");
const { requireAuth, requireRole } = require("../../middlewares/auth.middleware");

const router = express.Router();

router.get(
  "/admin/area",
  requireAuth,
  requireRole("ADMIN"),
  entityModerationController.renderAdminDashboard,
);
router.get(
  "/admin/entidades",
  requireAuth,
  requireRole("ADMIN"),
  entityModerationController.renderAdminEntitiesList,
);
router.get(
  "/admin/usuarios",
  requireAuth,
  requireRole("ADMIN"),
  entityModerationController.renderAdminUsersList,
);
router.get(
  "/admin/publicaciones",
  requireAuth,
  requireRole("ADMIN"),
  entityModerationController.renderAdminPublicationsList,
);
router.get(
  "/admin/entidades/:entityId",
  requireAuth,
  requireRole("ADMIN"),
  entityModerationController.renderEntityReviewDetail,
);
router.post(
  "/admin/entidades/:entityId/estado",
  requireAuth,
  requireRole("ADMIN"),
  entityModerationController.updateEntityStatus,
);
router.post(
  "/admin/publicaciones/:eventId/retirar",
  requireAuth,
  requireRole("ADMIN"),
  entityModerationController.withdrawEventPublicationAction,
);

module.exports = router;
