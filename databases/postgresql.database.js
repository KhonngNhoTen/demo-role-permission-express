const { Sequelize } = require("sequelize");
const env = require("../configs/env");
const sequelize = new Sequelize({
  dialect: "postgres",
  host: env.DATABASE.HOST,
  username: env.DATABASE.USER,
  password: env.DATABASE.PASS,
  database: env.DATABASE.NAME,
  logging: env.DATABASE.LOGGING,
  port: env.DATABASE.PORT,
  pool: {
    max: 20,
    min: 1,
  },
});

module.exports = sequelize;
