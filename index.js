const express = require("express");
const app = express();
const port = 4000;
const mongoose = require("mongoose");


const {
  createUser,
  loginUser,
  getAllUserDetails,
  getUserDetail,
  updateDetails,
  verifyUser,
} = require("./controller/user");
const {
  validate,
  createUserValidator,
  loginValidator,
} = require("./middleware/middleware");
const { text } = require("body-parser");
const decodeToken = require("./Auth/userAuth");

app.use(express.json());
app.use(decodeToken)
app.get("/", (req, res) => {
  res.status(200).json({
    Hello: "HELLO",
  });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

app.get("/users", getAllUserDetails);
app.get("/users/:id", getUserDetail);

app.post("/", validate(createUserValidator), createUser);
app.post("/login", validate(loginValidator), loginUser);
app.post("/verify", verifyUser);

app.put("/users/:id", updateDetails);

mongoose.connect("mongodb://localhost:27017").then(() => {
  console.log("Database is connected");
});
