const ProjectController = {};
ProjectController.list = async (req, res, next) => {
  try {
    next({ msg: "List Project" });
  } catch (error) {
    next(error);
  }
};
ProjectController.create = async (req, res, next) => {
  try {
    next({ msg: "create Project" });
  } catch (error) {
    next(error);
  }
};
ProjectController.update = async (req, res, next) => {
  try {
    next({ msg: "update Project" });
  } catch (error) {
    next(error);
  }
};
ProjectController.detail = async (req, res, next) => {
  try {
    next({ msg: "detail Project" });
  } catch (error) {
    next(error);
  }
};

module.exports = ProjectController;
