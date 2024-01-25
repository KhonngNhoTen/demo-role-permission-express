const AuthController = require("../controllers/Auth.controller");
const Permission = require("../lib/Permission");
const VerifyTokenMiddleware = require("../middlewares/VerifyToken.middleware");

module.exports = new Permission([
  {
    code: "AUTH.LOGIN",
    url: "POST /login",
    handler: AuthController.login,
  },
  {
    code: "AUTH.LOGOUT",
    url: "POST /logout",
    handler: AuthController.logout,
    middlewares: [VerifyTokenMiddleware],
  },
]);
