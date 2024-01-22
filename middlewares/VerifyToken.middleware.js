const env = require("../configs/env");
const { models } = require("../models");
const ApiError = require("../utils/ApiError");
const { decodeToken } = require("../utils/Jwt");
const HandlerResponseMiddleware = require("./HandlerResponse.middleware");
const { User } = models;
module.exports = async function (req, res, next) {
  try {
    let auth = req.headers.authorization;
    auth = auth.slice(7);
    const payload = await decodeToken(auth, env.SERVER.SERECT_KEY);
    console.log(payload);

    const instance = await User.findByPk(payload.id);

    if (!instance) throw new ApiError({ message: "Token invalid", status: "404" });

    // Neu tai khoan bi admin dang xuat
    if (instance.token === "") throw new ApiError({ message: "Require auth", status: "401" });

    // Không cho phép đăng nhập 1 tài khoản trên nhiều thiết bị
    if (instance.token !== auth) throw new ApiError({ message: "Require auth", status: "401" });
    res.locals.account = instance;
    next();
  } catch (error) {
    console.log(error);
    if (error.name === "TokenExpiredError")
      HandlerResponseMiddleware(new ApiError({ message: "Token Expired", status: "401" }), req, res, next);
    else HandlerResponseMiddleware(new ApiError({ message: "Token invalid", status: "401" }), req, res, next);
  }
};
