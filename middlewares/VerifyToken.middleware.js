const env = require("../configs/env");
const { models } = require("../models");
const ApiError = require("../utils/ApiError");
const { decodeToken } = require("../utils/Jwt");
const HandlerResponseMiddleware = require("./HandlerResponse.middleware");
const { User, Permission, Role } = models;
module.exports = async function (req, res, next) {
  try {
    let token = req.headers.authorization;
    token = auth.slice(7);

    await checkToken(token);

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError")
      HandlerResponseMiddleware(new ApiError({ message: "Token Expired", status: "401" }), req, res, next);
    else HandlerResponseMiddleware(new ApiError({ message: "Token invalid", status: "401" }), req, res, next);
  }
};

async function checkToken(token) {
  try {
    const payload = await decodeToken(token, env.SERVER.SERECT_KEY);

    const instance = await User.findByPk(payload.id);

    if (!instance) throw new ApiError({ message: "Token invalid", status: "404" });

    // Neu tai khoan bi admin dang xuat
    if (instance.token === "") throw new ApiError({ message: "Require auth", status: "401" });

    // Không cho phép đăng nhập 1 tài khoản trên nhiều thiết bị
    if (instance.token !== auth) throw new ApiError({ message: "Require auth", status: "401" });
    return instance;
  } catch (error) {
    console.log(error);
    if (error.name === "TokenExpiredError") throw new ApiError({ message: "Token Expired", status: "401" });
    throw new ApiError({ message: "Token invalid", status: "401" });
  }
}

async function checkPermission(instance) {
  try {
    const permission = await Permission.findOne({ where: { url }, include: { model: Role, as: "roles" } });
    if (!permission.roles.includes((e) => e.id === instance.idRole))
      throw new ApiError({ code: "403", message: "Not permission", status: 403 });
  } catch (error) {
    throw error;
  }
}
