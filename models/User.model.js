const { Model, DataTypes } = require("sequelize");

class User extends Model {
  /** @param {import ("sequelize").Sequelize} connection */
  init(connection, data) {
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
      },
      {
        tableName: "Users",
        sequelize: connection,
      }
    );
  }

  /** @param {Object.<string, typeof Model>} param */
  relationship({}) {}
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
