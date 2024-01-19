const express = require("express");
const bodyParser = require("body-parser");
const router = require("./routes");
const handlerResponse = require("./middlewares/HandlerResponse.middleware");
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(router);

app.use(handlerResponse);

module.exports = app;
// const endpoints = require("express-list-endpoints");
// console.log(endpoints(app));
