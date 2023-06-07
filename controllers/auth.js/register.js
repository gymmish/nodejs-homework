const {User} = require("../../models/users");
const { validateBody, ctrlWrapper } = require("../../utils");

const register = ctrlWrapper(async (req, res) => {
   const result = await User.create(req.body);

   res.json({
    mail: result.email,
    subscription: "starter"
   })
  });
