const express = require("express");

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

module.exports = router;
