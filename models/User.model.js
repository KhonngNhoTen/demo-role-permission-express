const { Model, DataTypes } = require("sequelize");

class User extends Model {
  /** @param {import ("sequelize").Sequelize} connection */
  static inits(connection, data) {
    User.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
        },
        password: {
          type: DataTypes.STRING,
        },
        age: {
          type: DataTypes.INTEGER,
        },
        idTeam: {
          type: DataTypes.INTEGER,
        },
        token: DataTypes.STRING,
      },
      {
        tableName: "Users",
        sequelize: connection,
      }
    );

    return User;
  }

  /** @param {Object.<string, typeof Model>} param */
  static relationship({ User, Team, Project, Task }) {
    if (Team) {
      User.belongsTo(Team, { foreignKey: "idTeam", as: "team" });
    }
    if (Task) {
      User.hasMany(Project, { foreignKey: "assignee", as: "tasks" });
    }
    if (Project) {
      User.belongsToMany(Project, {
        through: {
          model: Task,
        },
        foreignKey: "assignee",
        otherKey: "idProject",
        as: "projects",
      });
    }
  }
}

class UserData extends User {
  id = 0;
  name = "";

  /** Mật khẩu */
  password = "";

  /** Tuổi người dùng */
  age = 0;
}

module.exports = UserData;
