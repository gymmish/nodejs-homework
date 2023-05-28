const { Contact } = require("../../models/contsct");

const getContactId = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.getContactById(contactId);
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

module.exports = getContactId;
