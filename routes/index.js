const path = require("path");
const { PermissionLoader } = require("../lib");

new PermissionLoader(path.join(__dirname, "../permissions/**.permission.js"))
  .getApis()
  .forEach((e) => console.log("....", e));
