const { Model, DataTypes } = require("sequelize");

class Project extends Model {
  /** Trạng thái dự án */
  static STATUS = {
    /** Mới tạo */
    CREATED: 1,
    /** Hoạt động */
    ACTIVE: 2,
    /** Không hoạt động */
    INACTIVE: -1,
  };
  /** @param {import ("sequelize").Sequelize} connection */
  init(connection, data) {
    Project.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
        },
        status: {
          type: DataTypes.INTEGER,
        },
      },
      {
        tableName: "Projects",
        sequelize: connection,
      }
    );
  }

  /** @param {Object.<string, typeof Model>} param */
  relationship({ User, Task }) {}
}

class ProjectData extends Project {
  id = 0;
  name = "";

  /** Mật khẩu */
  password = "";

  /** Tuổi người dùng */
  age = 0;
}

module.exports = ProjectData;
