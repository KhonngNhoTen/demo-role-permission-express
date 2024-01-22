const { Model, DataTypes } = require("sequelize");

class Team extends Model {
  /** @param {import ("sequelize").Sequelize} connection */
  static inits(connection, data) {
    Team.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
        },
      },
      {
        tableName: "Teams",
        sequelize: connection,
      }
    );
    return Team;
  }

  /** @param {Object.<string, typeof Model>} param */
  static relationship({ Team, User }) {
    if (User)
      Team.hasMany(User, {
        as: "users",
        foreignKey: "idTeam",
      });
  }
}

class TeamData extends Team {
  id = 0;
  name = "";

  /** Mật khẩu */
  password = "";

  /** Tuổi người dùng */
  age = 0;
}

module.exports = TeamData;
