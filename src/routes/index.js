const express = require("express");

const authRouter = require("./auth");
const entityRouter = require("./entities");
const homeController = require("../controllers/home.controller");

const router = express.Router();

router.get("/", homeController.renderHome);
router.get("/health", homeController.getHealth);
router.get("/health/db", homeController.renderDbCheck);
router.use("/", authRouter);
router.use("/", entityRouter);

module.exports = router;
