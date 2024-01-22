const TaskController = {};
TaskController.list = async (req, res, next) => {
  try {
    next({ msg: "List Task" });
  } catch (error) {
    next(error);
  }
};
TaskController.create = async (req, res, next) => {
  try {
    next({ msg: "create Task" });
  } catch (error) {
    next(error);
  }
};
TaskController.update = async (req, res, next) => {
  try {
    next({ msg: "update Task" });
  } catch (error) {
    next(error);
  }
};
TaskController.detail = async (req, res, next) => {
  try {
    next({ msg: "detail Task" });
  } catch (error) {
    next(error);
  }
};
TaskController.assignUser = async (req, res, next) => {
  try {
    next({ msg: "assignUser" });
  } catch (error) {
    next(error);
  }
};
module.exports = TaskController;
