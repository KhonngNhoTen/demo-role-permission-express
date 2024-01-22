const ApiError = require("./ApiError");

module.exports = async function (nameModel, id, options) {
  const instance = await nameModel.findByPk(id, options);
  if (instance) return instance;
  throw new ApiError({ massage: "Not found user", status: "404" });
};
