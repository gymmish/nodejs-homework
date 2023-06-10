const {User} = require("../../models/users");
const {  ctrlWrapper } = require("../../utils");

const register = ctrlWrapper(async (req, res) => {
   const {email} = req.body;
   const user = await User.findOne({email})
if(user) {
   const error = new Error(`Email in use`);
   error.status = 409;
   throw error;
 
}

    const result = await User.create(req.body);
   res.status(201).json({
    mail: result.email,
    subscription: "starter"
   })
  });


  module.exports ={
   register,
}