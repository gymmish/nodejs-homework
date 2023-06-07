const { Schema, model } = require("mongoose");
const Joi = require("joi");

const userSchema = new Schema(
    {
        password: {
          type: String,
          required: [true, 'Set password for user'],
        },
        email: {
          type: String,
          required: [true, 'Email is required'],
          unique: true,
        },
        subscription: {
          type: String,
          enum: ["starter", "pro", "business"],
          default: "starter"
        },
        token: String
      },
  { versionKey: false, timestamps: true }
);

const joiSchema = Joi.object({
  name: Joi.string().messages({ "string.pattern.base": `Not valid name` }),
  email: Joi.string().messages({ "string.pattern.base": `Not valid email` }),
  subscription: Joi.string(),
});
const User = model("user", userSchema);

module.export = {
  User,
  joiSchema,
};
