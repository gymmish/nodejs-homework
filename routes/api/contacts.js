const express = require("express");
const router = express.Router();
const { validateBody, ctrlWrapper } = require("../../utils");
const { contacts: ctrl } = require("../../controllers");

const { joiSchema } = require("../../models/contact");

router.get("/", ctrlWrapper(ctrl.getListContact));

router.get("/:contactId", ctrlWrapper(ctrl.getContact));

router.post("/", validateBody(joiSchema), ctrlWrapper(ctrl.addContacts));

router.patch(
  "/:contactId/favorite",
  validateBody(joiSchema),
  ctrlWrapper(ctrl.updateStatus)
);

router.delete("/:contactId", ctrlWrapper(ctrl.removeContact));

router.put(
  "/:contactId",
  validateBody(joiSchema),
  ctrlWrapper(ctrl.updateContact)
);


module.exports = router;
