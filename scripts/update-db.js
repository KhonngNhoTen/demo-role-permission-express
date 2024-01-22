const { connection } = require("../databases");

async function main() {
  try {
    require("../models");
    await connection.sync({ alter: true });
    console.log("Sync database");
    process.exit(1);
  } catch (error) {
    console.error(error);
  }
}

main();
