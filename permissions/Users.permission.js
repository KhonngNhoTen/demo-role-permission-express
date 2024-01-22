const UserController = require("../controllers/Users.controller");
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
      handler: UserController.list,
    },
    {
      url: "POST /",
      code: "API.USER.CREATE",
      name: "Tạo mới User",
      handler: UserController.create,
    },
    {
      url: "GET /:idUser",
      code: "API.USER.DETAIL",
      name: "Chi tiết User",
      handler: UserController.detail,
    },
    {
      url: "PUT /:idUser",
      code: "API.USER.DETAIL",
      name: "Chỉnh sửa User",
      handler: UserController.update,
    },
  ],
});
