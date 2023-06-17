const { Contact } = require("../../models/contact");

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.removeContact(contactId);
    if (!result) {
      const error = new Error(`Not found"`);
      error.status = 404;
      throw error;
    }
    res.status(200).send({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
};
module.exports = removeContact;
