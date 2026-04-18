const express = require("express");

const adminRouter = require("./admin");
const authRouter = require("./auth");
const entityRouter = require("./entities");
const volunteerRouter = require("./volunteers");
const homeController = require("../controllers/home.controller");

const router = express.Router();

router.get("/", homeController.renderHome);
router.get("/health", homeController.getHealth);
router.get("/health/db", homeController.renderDbCheck);
router.use("/", authRouter);
router.use("/", entityRouter);
router.use("/", volunteerRouter);
router.use("/", adminRouter);

module.exports = router;
