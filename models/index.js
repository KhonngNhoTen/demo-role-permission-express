const { connection } = require("../databases");

const models = {
  Project: require("./User.model"),
  User: require("./Project.model"),
  Task: require("./Task.model"),
};
// Load model
Object.keys(models).forEach((e) => {
  models[e].init(connection, data);
});
// Load relationship
Object.keys(models).forEach((e) => {
  models[e].relationship(models);
});

module.exports = models;
