const { Model, DataTypes } = require("sequelize");

class Task extends Model {
  /** @param {import ("sequelize").Sequelize} connection */
  static inits(connection, data) {
    Task.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        title: {
          type: DataTypes.STRING,
        },
        description: {
          type: DataTypes.STRING,
        },
        assignee: {
          type: DataTypes.INTEGER,
        },
        idProject: {
          type: DataTypes.INTEGER,
        },
      },
      {
        tableName: "Tasks",
        sequelize: connection,
      }
    );
    return Task;
  }

  /** @param {Object.<string, typeof Model>} param */
  static relationship({ Task, User, Project }) {
    if (User) Task.belongsTo(User, { foreignKey: "assignee", as: "user" });
    if (Project) Task.belongsTo(Project, { foreignKey: "idProject", as: "project" });
  }
}

class TaskData extends Task {
  id = 0;
  title = "";
  description = "";
  assignee = 0;
  idProject = 0;
}

module.exports = TaskData;
