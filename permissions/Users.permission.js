const Permission = require("../lib/Permission");
const verifyToken = null;

module.exports = new Permission({
  baseUrl: "/users",
  code: "USERS_FEATURE",
  name: "Quản lý user",
  middlewares: [verifyToken],
  apis: [
    {
      url: "GET /",
      code: "API.USER.LIST",
      name: "Danh sách User",
      handler: async (req, res, next) => {
        next({ msg: "OK" });
      },
    },
    {
      url: "POST /",
      code: "API.USER.CREATE",
      name: "Tạo mới User",
      handler: async (req, res, next) => {
        next({ msg: "OK" });
      },
    },
    {
      url: "GET /:idUser",
      code: "API.USER.DETAIL",
      name: "Chi tiết User",
      handler: async (req, res, next) => {
        next({ msg: "OK" });
      },
    },
    {
      url: "UPDATE /:idUser",
      code: "API.USER.DETAIL",
      name: "Chỉnh sửa User",
      handler: async (req, res, next) => {
        next({ msg: "OK" });
      },
    },
  ],
});
