const { Contact } = require("../../models/contact");

const addContacts = async (req, res, next) => {
  const resault = await Contact.listContacts();
  res.json(resault);
};
module.exports = addContacts;
