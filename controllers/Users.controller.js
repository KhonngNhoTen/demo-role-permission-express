const { models } = require("../models");
const FindOrThrowError = require("../utils/FindOrThrowError");
const { User } = models;
const UserController = {};
UserController.list = async (req, res, next) => {
  try {
    const users = await User.findAll();
    next({ data: users });
  } catch (error) {
    next(error);
  }
};
UserController.detail = async (req, res, next) => {
  try {
    const user = await FindOrThrowError(User, req.params.idUser);
    next({ data: user.getPublicInfo() });
  } catch (error) {
    next(error);
  }
};
UserController.create = async (req, res, next) => {
  try {
    // const user = await User.create(req.body);
    next({ data: "create user" });
  } catch (error) {
    next(error);
  }
};
UserController.update = async (req, res, next) => {
  try {
    const user = await User.update(req.body, { where: { id: req.params.idUser } });
    next({ data: "update user" });
  } catch (error) {
    next(error);
  }
};

module.exports = UserController;
