const md5 = require("md5");
const env = require("../configs/env");
const { models } = require("../models");
const ApiError = require("../utils/ApiError");
const { generateToken } = require("../utils/Jwt");
const { User } = models;

const AuthController = {};

AuthController.login = async (req, res, next) => {
  try {
    const body = req.body;
    const user = await User.findOne({
      where: {
        name: body.name,
        password: md5(body.password),
      },
    });
    if (!user) throw new ApiError({ message: "Not found user", status: "404" });
    user.token = await generateToken({ id: user.id }, env.SERVER.SERECT_KEY);
    await user.save();
    const { name, token, id } = user.dataValues;
    next({ data: { name, token, id } });
  } catch (error) {
    next(error);
  }
};
AuthController.logout = async (req, res, next) => {
  try {
    await res.locals.account.update({ token: "" });
    next({ msg: "Ok" });
  } catch (error) {
    next(error);
  }
};
module.exports = AuthController;
