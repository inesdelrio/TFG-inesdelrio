const express = require("express");

const authSessionController = require("../../controllers/auth/auth-session.controller");
const registrationController = require("../../controllers/auth/register-volunteer.controller");
const userAreaController = require("../../controllers/auth/user-area.controller");
const { requireAuth, requireRole } = require("../../middlewares/auth.middleware");

const router = express.Router();

router.get("/registro", registrationController.renderRegisterVolunteerForm);
router.post("/registro", registrationController.registerVolunteer);
router.get("/login", authSessionController.renderLoginForm);
router.post("/login", authSessionController.loginUser);
router.post("/logout", authSessionController.logoutUser);
router.get("/voluntariado/area", requireAuth, requireRole("VOLUNTARIO"), userAreaController.renderVolunteerArea);
router.get("/entidad/area", requireAuth, requireRole("ENTIDAD"), userAreaController.renderEntityArea);
router.get("/admin/area", requireAuth, requireRole("ADMIN"), userAreaController.renderAdminArea);

module.exports = router;
