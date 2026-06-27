const express = require("express");

const geocodingController = require("../../controllers/maps/geocoding.controller");
const { requireAuth, requireRole } = require("../../middlewares/auth.middleware");

const router = express.Router();

router.get(
  "/api/geocoding/madrid",
  requireAuth,
  requireRole("ENTIDAD", "ADMIN"),
  geocodingController.searchMadridAddressesAction,
);

module.exports = router;
