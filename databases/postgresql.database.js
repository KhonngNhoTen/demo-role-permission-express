const { Sequelize } = require("sequelize");
const env = require("../configs/env");

const sequelize = new Sequelize(env.DATABASE.NAME, env.DATABASE.USER, env.DATABASE.PASS, {
  dialect: "postgres",
  host: env.DATABASE.HOST,
  pool: {
    max: 10,
    min: 1,
  },
});

module.exports = sequelize;
