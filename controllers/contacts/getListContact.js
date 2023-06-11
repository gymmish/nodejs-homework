const { Contact } = require("../../models/contact");

const getListContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const result = await Contact.find({ owner }).skip((page - 1) * limit).limit(limit).populate("owner", "email");
  res.json(result);
};

module.exports = getListContacts;
