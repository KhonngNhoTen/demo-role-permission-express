const md5 = require("md5");
const { Project, Task, User, Team } = require("../models");

const fakeDatabase = {
  Team: [
    {
      name: "Team 1",
    },
    {
      name: "Team 2",
    },
  ],
  User: [
    {
      name: "User 1",
      password: md5("123456aA@"),
      age: 18,
      idTeam: 1,
    },
    {
      name: "User 2",
      password: md5("123456aA@"),
      age: 18,
      idTeam: 1,
    },
  ],
  Project: [
    {
      name: "Project 1",
    },
  ],
  Task: [
    {
      title: "Task 1",
      description: "Description task 1",
      assignee: 1,
      idProject: 1,
      status: 1,
    },
    {
      title: "Task 2",
      description: "Description task 2",
      assignee: 2,
      idProject: 1,
      status: 1,
    },
  ],
};

async function main() {
  try {
    await Team.bulkCreate(fakeDatabase.Team);
    await User.bulkCreate(fakeDatabase.User);
    await Project.bulkCreate(fakeDatabase.Project);
    await Task.bulkCreate(fakeDatabase.Task);
    console.log("Fake database");
    process.exit(1);
  } catch (error) {
    console.error(error);
  }
}

main();
