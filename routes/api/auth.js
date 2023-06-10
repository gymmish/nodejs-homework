const express = require("express");
const router = express.Router();

const { validateBody } = require("../../utils");
const {registJoiSchema} = require("../../models/users");
const ctrl = require("../../controllers/auth.js/register")

router.post("/register", validateBody(registJoiSchema), ctrl.register );

module.exports = router;


