const express = require("express");
require("dotenv").config();
const cors = require("cors");
const mysql = require("mysql");
const app = express();

// Import routes
const users = require("./routes/api/userRoutes");

// MySQL connection
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});
app.set("connection", connection);

connection.connect(err => {
  if (err) return console.log(err);
  console.log("===== Connected to MySQL on localhost =====");
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api/users", users);

// Server
app.listen(4000, () => {
  console.log("===== Server is running on port 4000 =====");
});
