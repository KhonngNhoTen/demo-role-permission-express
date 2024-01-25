const { Model, DataTypes } = require("sequelize");

class Role extends Model {
  /** @param {import ("sequelize").Sequelize} connection */
  static inits(connection, data) {
    Role.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
        },
        code: {
          type: DataTypes.STRING,
          unique: true,
        },
      },
      {
        tableName: "Roles",
        sequelize: connection,
      }
    );
    return Role;
  }

  /** @param {Object.<string, typeof Model>} param */
  static relationship({ User, Role, Permission }) {
    if (User) Role.hasMany(User, { foreignKey: "roleCode", as: "user" });
    if (Permission) Role.belongsToMany(Permission, { through: "RolePermission", sourceKey: "code" });
  }
}

class RoleData extends Role {
  id = 0;
  name = "";
}

module.exports = RoleData;
