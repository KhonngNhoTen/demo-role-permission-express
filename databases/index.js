const connection = require("./postgresql.database");

async function authentication() {
  try {
    await connection.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    throw error;
  }
}

module.exports = { connection, authentication };
