require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const knex = require("knex");
const bcrypt = require("bcrypt");
const path = require("path");

// Controllers
const signIn = require("./controllers/signIn");
const register = require("./controllers/register");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

// DB Connection Config to ElephantSQL
const db = knex({
  client: "pg",
  connection: {
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB,
  },
});

const app = express();

// Middlewares
app.use(express.static(path.join(__dirname, "view")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

//API Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "view", "index.html"));
});

app.post("/signin", (req, res) => signIn.processAuth(req, res, db, bcrypt));

app.post("/register", (req, res) =>
  register.processRegister(req, res, db, bcrypt)
);

app.get("/profile/:id", profile.profileGet(db));
app.post("/imageUrl", image.handleApiCall);
app.put("/image", (req, res) => image.updateEntry(req, res, db));

//Server Config
app.listen(process.env.PORT || 3000, () => {
  console.log("Server started!");
});
