const ctrlWrapper = require("./ctrlWrapper");
const validateBody = require("./validateBody");
const handleMongooseErr = require("./handleMongooseErr");
const authenticate = require("./authenticate");
const upload = require("./upload");
const sendEmail = require("./sendEmail");

module.exports = {
  ctrlWrapper,
  validateBody,
  handleMongooseErr,
  authenticate,
  upload,
  sendEmail,
};
