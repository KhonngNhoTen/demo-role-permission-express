const { connection } = require("../databases");

const models = {
  Project: require("./Project.model"),
  User: require("./User.model"),
  Task: require("./Task.model"),
  // Team: require("./Team.model"),
};
// Load model
Object.keys(models).forEach((e) => {
  models[e] = models[e].inits(connection, {});
});
// Load relationship
Object.keys(models).forEach((e) => {
  models[e].relationship(models);
});

module.exports = { models };
