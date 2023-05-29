const getListContact = require("./getListContact");
const getContact = require("./getContact");
const addContacts = require("./addContacts");
const removeContact = require("./removeContact");
const { updateContact, updateStatus } = require("./updateContact");

module.exports = {
  getListContact,
  getContact,
  addContacts,
  removeContact,
  updateContact,
  updateStatus,
};
