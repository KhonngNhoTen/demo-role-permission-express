const { Model, DataTypes } = require("sequelize");

class Permission extends Model {
  /** @param {import ("sequelize").Sequelize} connection */
  static inits(connection, data) {
    Permission.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
        },
        desciption: {
          type: DataTypes.STRING,
        },
        code: {
          type: DataTypes.STRING,
          unique: true,
        },
        scope: {
          type: DataTypes.STRING,
        },
        url: {
          type: DataTypes.STRING,
        },
        method: {
          type: DataTypes.STRING,
        },
        type: {
          type: DataTypes.INTEGER,
        },
      },
      {
        tableName: "Permissions",
        sequelize: connection,
      }
    );
    return Permission;
  }

  /** @param {Object.<string, typeof Model>} param */
  static relationship({ Role, Permission }) {
    if (Role) Permission.belongsToMany(Role);
  }
}

class PermissionData extends Permission {
  id = 0;
  name = "";
  code = "";
  desciption = "";
  scope = "";
  url = "";
  method = "";
  type = 0;
}

module.exports = PermissionData;
