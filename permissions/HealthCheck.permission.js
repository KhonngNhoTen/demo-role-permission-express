const Permission = require("../lib/Permission");

module.exports = new Permission([
  {
    url: "GET /ping",
    handler: async (req, res, next) => {
      next({ msg: "ok" });
    },
  },
]);
