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
      code: "PROJECT.LIST",
      name: "Danh sách PROJECT",
      handler: ProjectController.list,
    },
    {
      url: "POST /",
      code: "PROJECT.CREATE",
      name: "Tạo mới PROJECT",
      handler: ProjectController.create,
    },
    {
      url: "GET /:idPROJECT",
      code: "PROJECT.DETAIL",
      name: "Chi tiết PROJECT",
      handler: ProjectController.detail,
    },
    {
      url: "PUT /:idPROJECT",
      code: "PROJECT.UPDATE",
      name: "Chỉnh sửa PROJECT",
      handler: ProjectController.update,
    },
    {
      url: "POST /:idPROJECT/assign-member",
      code: "PROJECT.MEMBER.ASSIGN",
      name: "Danh sách task trong project",
      handler: async (req, res, next) => {
        next({ message: "List task of project" });
      },
    },
    {
      url: "GET /:idPROJECT/tasks",
      code: "PROJECT.TASK.LIST",
      name: "Danh sách task trong project",
      handler: async (req, res, next) => {
        next({ message: "List task of project" });
      },
    },
    {
      url: "GET /:idPROJECT/members",
      code: "PROJECT.MEMBER.LIST",
      name: "Danh sách member trong project",
      handler: async (req, res, next) => {
        next({ message: "List members of project" });
      },
    },
    // {
    //   url: "POST /user/:idUser/assign",
    //   code: "PROJECT.ASSIGN_MEMBER",
    //   name: "Chỉnh sửa PROJECT",
    //   handler: ProjectController.assignUser,
    // },
  ],
});
