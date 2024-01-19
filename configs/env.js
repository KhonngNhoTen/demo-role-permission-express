const dotenv = require("dotenv");
dotenv.config();
const env = {
  SERVER: {
    PORT: getInt("SERVER_PORT"),
  },
  DATABASE: {
    HOST: getString("DB_HOST", "localhost"),
    PORT: getInt("DB_PORT", 5432),
    USER: getString("DB_USER"),
    PASS: getString("DB_PASS"),
    NAME: getString("DB_NAME"),
    LOGGING: getBool("DB_LOGGING", true),
  },
};

function getInt(key, defaultValue = 0) {
  return process.env[key] ? parseInt(process.env[key]) : defaultValue;
}
function getString(key, defaultValue = "") {
  return process.env[key] ? process.env[key] : defaultValue;
}
function getBool(key, defaultValue = true) {
  return process.env[key] ? process.env[key] === "true" : defaultValue;
}
function getObject(key, defaultValue = {}) {
  return process.env[key] ? JSON.parse(process.env[key]) : defaultValue;
}
module.exports = env;
