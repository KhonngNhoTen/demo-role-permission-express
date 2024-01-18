const Permission = require("../lib/Permission");
const verifyToken = null;

module.exports = new Permission({
  baseUrl: "/users",
  code: "USERS_FEATURE",
  name: "Quản lý user",
  middlewares: [verifyToken],
  apis: [
    {
      url: "POST /",
      code: "API.USER.CREATE",
      name: "Tạo mới User",
      handler: async (req, res, next) => {
        next({ msg: "OK" });
      },
    },
  ],
});
