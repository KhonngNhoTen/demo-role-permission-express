const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const router = require("./routes");
const handlerResponse = require("./middlewares/HandlerResponse.middleware");
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// use morgan User
app.use(
  morgan(
    "\x1b[33m[:date[iso]] :method :url - \x1b[38;5;36mUser :remote-addr  :user-agent - \x1b[38;5;75mResponse status=:status :response-time ms"
  )
);

app.use(router);

app.use(handlerResponse);

module.exports = app;
// const endpoints = require("express-list-endpoints");
// console.log(endpoints(app));
