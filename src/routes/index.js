const express = require("express");

const adminRouter = require("./admin");
const apiRouter = require("./api");
const authRouter = require("./auth");
const entityRouter = require("./entities");
const eventRouter = require("./events");
const notificationRouter = require("./notifications");
const volunteerRouter = require("./volunteers");
const homeController = require("../controllers/home.controller");

const router = express.Router();

router.get("/", homeController.renderHome);
router.get("/health", homeController.getHealth);
router.get("/health/db", homeController.renderDbCheck);
router.use("/", authRouter);
router.use("/", entityRouter);
router.use("/", eventRouter);
router.use("/", notificationRouter);
router.use("/", volunteerRouter);
router.use("/", adminRouter);
router.use("/", apiRouter);

module.exports = router;
