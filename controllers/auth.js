const bcrypt = require("bcrypt");
const {User} = require("../models/users");
const {  ctrlWrapper} = require("../utils");
const jwt = require("jsonwebtoken");
const {SECRET_KEY} = process.env;


const register = ctrlWrapper(async (req, res) => {
   const {email, password} = req.body;
   const user = await User.findOne({email})
if(user) {
   const error = new Error(`Email in use`);
   error.status = 409;
   throw error;
 
}

  const hashPassword = await bcrypt.hash(password, 10);

    const result = await User.create({...req.body, password: hashPassword});
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



  module.exports = {
   register,
   login,
   logout,
   getCurrent,
}