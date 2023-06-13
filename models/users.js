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

const registJoiSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().required(),
});

const loginJoiSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().required(),
});


const User = model("user", userSchema);

module.exports = {
  User,
  loginJoiSchema,
  registJoiSchema,
};
