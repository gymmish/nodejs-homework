const { Contact } = require("../../models/contact");

const addContacts = async (req, res, next) => {
  const { _id: owner } = req.user;
  const resault = await Contact.listContacts({...req.body, owner});
  res.json(resault);
};
module.exports = addContacts;
