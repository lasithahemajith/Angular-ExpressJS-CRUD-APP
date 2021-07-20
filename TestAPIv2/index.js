const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const path = __dirname + "/app/views/";

const app = express();

app.use(express.static(path));

let corsOptions = {
  origin: "http://localhost:1081",
};

app.use(cors(corsOptions));

/*
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
*/

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to testAPIv2 application." });
});

const db = require("./app/config/db.config");
db.sequelize.sync();
db.sequelize.sync({ force: false }).then(() => {
  console.log("Drop and re-sync db.");
});

app.get("/", function (req, res) {
  res.sendFile(path + "index.html");
});

require("./app/routes/employees.route")(app);
require("./app/routes/department.route")(app);

// set port, listen for requests
const PORT = process.env.PORT || 1080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
