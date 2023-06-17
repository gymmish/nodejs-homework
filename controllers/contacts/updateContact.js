const { Contact } = require("../../models/contact");

const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.updateContacts(contactId, req.body);
    if (!result) {
      const error = new Error(`Not found"`);
      error.status = 404;
      throw error;
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};
const updateStatus = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.updateContacts(contactId, req.body);
    if (!result) {
      const error = new Error(`Not found"`);
      error.status = 404;
      throw error;
    }
    res.json(result);
  } catch (error) {
    next(error.massage(`Missing field favorite`));
  }
};

module.exports = { updateContact, updateStatus };
