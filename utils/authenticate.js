const jwt = require("bcrypt");

const { SECRET_KEY } = process.env;

const { User } = require("../models/users");

const authenticate = async (req, res, next) => {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
        const error = new Error(`Not authorized`);
        error.status = 401;
        throw error;
    }
    try {
        const { id } = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(id);
        if (!user || !user.token || user.token !== token) {
        const error = new Error(`Not authorized`);
        error.status = 401;
        throw error;
        }
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = authenticate;
