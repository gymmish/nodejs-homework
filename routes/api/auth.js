const express = require("express");
const router = express.Router();

const { validateBody, authenticate, upload } = require("../../utils");

const {
  registJoiSchema,
  loginJoiSchema,
  emailSchema,
} = require("../../models/users");
const ctrl = require("../../controllers/auth");

router.post("/register", validateBody(registJoiSchema), ctrl.register);

router.get("/auth/verify/:verificationToken", ctrl.veryfiEmail);

router.post("/verify", validateBody(emailSchema), ctrl.resendVerifyEmail);

router.post("/login", validateBody(loginJoiSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);

module.exports = router;
