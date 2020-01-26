const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const knex = require("knex");
const bcrypt = require("bcrypt");

// Controllers
const signIn = require("./controllers/signIn");
const register = require("./controllers/register");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

// DB Connection Config to ElephantSQL
const db = knex({
  client: "pg",
  connection: {
    host: "arjuna.db.elephantsql.com",
    user: "tjauipvb",
    password: "btnRzDnyH12YLb8pneRn4PO-0QrJm1xw",
    database: "tjauipvb"
  }
});

const app = express();

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

//API Routes
app.get("/", (req, res) => {
  res.status(200).json("API Functioning! :')");
});

app.post("/signin", (req, res) => signIn.processAuth(req, res, db, bcrypt));
app.post("/register", (req, res) =>
  register.processRegister(req, res, db, bcrypt)
);
app.get("/profile/:id", (req, res) => profile.profileGet(req, res, db));
app.post("/imageUrl", image.handleApiCall);
app.put("/image", (req, res) => image.updateEntry(req, res, db));

//Server Config
let port = process.env.PORT;
port === undefined ? (port = 3000) : port;
app.listen(port, () => {
  console.log("Server started on port " + port + "!");
});
