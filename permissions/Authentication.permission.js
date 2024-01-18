const Permission = require("../lib/Permission");

module.exports = new Permission([
  {
    url: "/login",
    handler: async (req, res, next) => {
      next({ msg: "login" });
    },
  },
  {
    url: "/logout",
    handler: async (req, res, next) => {
      next({ msg: "logout" });
    },
  },
]);
