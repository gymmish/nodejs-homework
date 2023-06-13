const express = require("express");
const router = express.Router();

const { validateBody, authenticate } = require("../../utils");

const {registJoiSchema, loginJoiSchema} = require("../../models/users");
const ctrl = require("../../controllers/auth")

router.post("/register", validateBody(registJoiSchema), ctrl.register );

router.post("/login", validateBody(loginJoiSchema), ctrl.login );


router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);


module.exports = router;


