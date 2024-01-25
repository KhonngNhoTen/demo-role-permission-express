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
      code: "USER.LIST",
      name: "Danh sách User",
      handler: UserController.list,
    },
    {
      url: "POST /",
      code: "USER.CREATE",
      name: "Tạo mới User",
      handler: UserController.create,
    },
    {
      url: "GET /:idUser",
      code: "USER.DETAIL",
      name: "Chi tiết User",
      handler: UserController.detail,
    },
    {
      url: "PUT /:idUser",
      code: "USER.UPDATE",
      name: "Chỉnh sửa User",
      handler: UserController.update,
    },
    {
      url: "GET /:idUser/tasks",
      code: "USER.TASKS.LIST",
      name: "Chỉnh sửa User",
      handler: async (req, res, next) => {
        next({ message: "List tasks of member" });
      },
    },
  ],
});
