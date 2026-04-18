const express = require("express");

const homeController = require("../controllers/home.controller");

const router = express.Router();

router.get("/", homeController.renderHome);
router.get("/health", homeController.getHealth);
router.get("/health/db", homeController.renderDbCheck);

module.exports = router;
