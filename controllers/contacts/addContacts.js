const { Contact } = require("../../models/contsct");

const addContscts = async (req, res, next) => {
  const resault = await Contact.listContacts();
  res.json(resault);
};
module.exports = addContscts;
