const router = require("express").Router();
const path = require("path");
const { PermissionLoader } = require("../lib");

new PermissionLoader(path.join(__dirname, "../permissions/**.permission.js")).getApis().forEach((e) => {
  e.registry(router);
});

module.exports = router;
