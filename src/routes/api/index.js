const express = require("express");

const geocodingController = require("../../controllers/maps/geocoding.controller");

const router = express.Router();

router.get(
  "/api/geocoding/madrid",
  geocodingController.searchMadridAddressesAction,
);

module.exports = router;
