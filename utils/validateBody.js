const validateBody = (joiSchema) => {
  const func = async (req, res, next) => {
    const { error } = joiSchema.validate(req.body);
    if (error) {
      next(error.message);
    }
    next();
  };
  return func;
};

module.exports = validateBody;
