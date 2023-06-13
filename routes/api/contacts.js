const express = require("express");
const router = express.Router();
const { validateBody, ctrlWrapper,authenticate } = require("../../utils");
const { contacts: ctrl } = require("../../controllers");

const { joiSchema } = require("../../models/contact");

router.get("/", authenticate, ctrlWrapper(ctrl.getListContact));

router.get("/:contactId", authenticate, ctrlWrapper(ctrl.getContact));

router.post("/", authenticate, validateBody(joiSchema), ctrlWrapper(ctrl.addContacts));

router.patch(
  "/:contactId/favorite",authenticate,
  validateBody(joiSchema),
  ctrlWrapper(ctrl.updateStatus)
);

router.delete("/:contactId",authenticate, ctrlWrapper(ctrl.removeContact));

router.put(
  "/:contactId",
  authenticate,
  validateBody(joiSchema),
  ctrlWrapper(ctrl.updateContact)
);


module.exports = router;
