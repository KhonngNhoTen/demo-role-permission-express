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
      code: "TASK.LIST",
      name: "Danh sách Task",
      handler: TaskController.list,
    },
    {
      url: "POST /",
      code: "TASK.CREATE",
      name: "Tạo mới Task",
      handler: TaskController.create,
    },
    {
      url: "GET /:idTask",
      code: "TASK.DETAIL",
      name: "Chi tiết Task",
      handler: TaskController.detail,
    },
    {
      url: "PUT /:idTask",
      code: "TASK.UPDATE",
      name: "Chỉnh sửa Task",
      handler: TaskController.update,
    },
    {
      url: "GET /:idTask",
      code: "TASK.UPDATE",
      name: "Chỉnh sửa Task",
      handler: TaskController.update,
    },
    {
      url: "POST /user/:idUser/assign",
      code: "TASK.ASSIGN_MEMBER",
      name: "Chỉnh sửa Task",
      handler: TaskController.assignUser,
    },
  ],
});
