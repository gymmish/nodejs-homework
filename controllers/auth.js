const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const {User} = require("../models/users");
const {ctrlWrapper} = require("../utils");
const jwt = require("jsonwebtoken");
const path = require("path");
const Jimp = require("jimp");
const fs = require("fs/promises");

const { SECRET_KEY } = process.env;

const avatarsDir = path.join(__dirname, "../", "public", "avatars");


const register = ctrlWrapper(async (req, res) => {
   const {email, password} = req.body;
   const user = await User.findOne({email})
if(user) {
   const error = new Error(`Email in use`);
   error.status = 409;
   throw error;
 
}

   const hashPassword = await bcrypt.hash(password, 10);
   const avatarURL = gravatar.url(email);

    const result = await User.create({...req.body, password: hashPassword, avatarURL});
   res.status(201).json({
    mail: result.email,
    subscription: "starter"
   })
});


const login = ctrlWrapper(async (req, res) => {
   const {email , password} =  req.body;
   const user = await User.findOne({email});

   if(!user) {
      const error = new Error(`Email or password is wrong`);
      error.status = 401;
      throw error;
   }
   const passwordCompare  = await bcrypt.compare(password, user.password);
   if(!passwordCompare) {
      const error = new Error(`Email or password is wrong`);
      error.status = 401;
      throw error;
   }

   const payload = {
   id: user._id,
   }
   const token = jwt.sign(payload, SECRET_KEY, {expiresIn:"24h"});
   await User.findByIdAndUpdate(user._id, { token });

   res.json({
      token,
   })
  });


const logout = ctrlWrapper(async (req, res) => {
   const { _id } = req.user;
   await User.findByIdAndUpdate(_id, { token: "" });
   res.json({
      message: "Logout"
   })
 });


const getCurrent = ctrlWrapper(async (req, res, next) => {
   const { email } = req.user;
   try {
      res.json({
      email
   })
   }
   catch {
      const error = new Error(`Not authorized`);
      error.status = 401;
      throw error;
   }
});

const updateAvatar = ctrlWrapper(async (req, res) => {
   const { _id } = req.user;

   const { path: tempUpload, originalName } = req.file;
   const fileName = `${_id}_${originalName}`;

   const resultUpload = path.join(avatarsDir, fileName);
  
   const image = await Jimp.read(tempUpload);
   image.resize(250, 250);
   await image.writeAsync(tempUpload);
   
   await fs.rename(tempUpload, resultUpload);

   const avatarURL = path.join("avatars", fileName);
   await User.findByIdAndUpdate(_id, { avatarURL });

   res.json({
      avatarURL,
   })
});



  module.exports = {
   register,
   login,
   logout,
   getCurrent,
   updateAvatar,
}