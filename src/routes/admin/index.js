const express = require("express");

const entityModerationController = require("../../controllers/admin/entity-moderation.controller");
const { requireAuth, requireRole } = require("../../middlewares/auth.middleware");

const router = express.Router();

router.get(
  "/admin/area",
  requireAuth,
  requireRole("ADMIN"),
  entityModerationController.renderPendingEntitiesList,
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

module.exports = router;
