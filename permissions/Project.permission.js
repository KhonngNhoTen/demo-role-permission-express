const ProjectController = require("../controllers/Project.controller");
const Permission = require("../lib/Permission");
const verifyToken = null;

module.exports = new Permission({
  baseUrl: "/projects",
  code: "PROJECT_FEATURE",
  name: "Quản lý PROJECTs",
  middlewares: [verifyToken],
  apis: [
    {
      url: "GET /",
      code: "API.PROJECT.LIST",
      name: "Danh sách PROJECT",
      handler: ProjectController.list,
    },
    {
      url: "POST /",
      code: "API.PROJECT.CREATE",
      name: "Tạo mới PROJECT",
      handler: ProjectController.create,
    },
    {
      url: "GET /:idPROJECT",
      code: "API.PROJECT.DETAIL",
      name: "Chi tiết PROJECT",
      handler: ProjectController.detail,
    },
    {
      url: "PUT /:idPROJECT",
      code: "API.PROJECT.UPDATE",
      name: "Chỉnh sửa PROJECT",
      handler: ProjectController.update,
    },
    // {
    //   url: "POST /user/:idUser/assign",
    //   code: "API.PROJECT.ASSIGN_MEMBER",
    //   name: "Chỉnh sửa PROJECT",
    //   handler: ProjectController.assignUser,
    // },
  ],
});
