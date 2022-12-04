var express = require("express");
const mongoose = require("mongoose");
var router = express.Router();

const user_api = require("../api/user_api");

const connection = mongoose.connection.readyState;

/* GET users listing. */
router.get("/", function (req, res) {
  if (connection === 1) {
    res.send("DB is connected");
  } else {
    res.send("DB is not connected");
  }
});

router.post("/signup", async function (req, res) {
  try {
    const { email } = req.body;

    let user = await user_api.findByEmail(email);

    if (user) {
      return res.status(400).json({
        code: 400,
        message: "User already exists",
      });
    } else {
      const response = await user_api.createUser(req.body);
      if (response.code === undefined) res.status(200).json(response);
    }
  } catch (e) {
    console.log(e);
    res.status(500).end("Internal server error");
  }
});

router.post("/signin", async function (req, res) {
  try {
    let response = await user_api.findUser(req.body);

    if (!response) {
      res.status(404).json({
        code: 404,
        message: "Invalid Email",
      });
    } else if (response === 404) {
      res.status(404).json({
        code: 404,
        message: "Invalid Password",
      });
    } else {
      res.status(200).json({
        code: 200,
        message: "Login Success",
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).end("Internal server error");
  }
});

router.get("/all", async function (req, res) {
  try {
    let response = await user_api.findAllUsers();
    res.status(200).send(response);
  } catch (e) {
    console.log(e);
    res.status(500).end("Internal server error");
  }
});

module.exports = router;
