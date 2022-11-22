var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const config = require("./config/keys").mongoURI;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
var indexRouter = require("./controllers/index");
const ControllerUser = require("./controllers/user");
const ControllerAuth = require("./controllers/auth");

var cors = require('cors')

var app = express();

app.use(cors())


app.use(express.static("public"));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/auth", ControllerAuth);
app.use("/user", ControllerUser);

console.log("this line work")

mongoose
  .connect(config, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Mongodb Successfuly Connect !"))
  .catch((err) => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("server running on port " + PORT));
