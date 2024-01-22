const TaskController = require("../controllers/Task.controller");
const Permission = require("../lib/Permission");
const verifyToken = null;

module.exports = new Permission({
  baseUrl: "/tasks",
  code: "TASKS_FEATURE",
  name: "Quản lý tasks",
  middlewares: [verifyToken],
  apis: [
    {
      url: "GET /",
      code: "API.TASK.LIST",
      name: "Danh sách Task",
      handler: TaskController.list,
    },
    {
      url: "POST /",
      code: "API.TASK.CREATE",
      name: "Tạo mới Task",
      handler: TaskController.create,
    },
    {
      url: "GET /:idTask",
      code: "API.TASK.DETAIL",
      name: "Chi tiết Task",
      handler: TaskController.detail,
    },
    {
      url: "PUT /:idTask",
      code: "API.TASK.UPDATE",
      name: "Chỉnh sửa Task",
      handler: TaskController.update,
    },
    {
      url: "POST /user/:idUser/assign",
      code: "API.TASK.ASSIGN_MEMBER",
      name: "Chỉnh sửa Task",
      handler: TaskController.assignUser,
    },
  ],
});
