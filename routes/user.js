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
    // console.log(req.body);
    const { email, password, username } = req.body;
    console.log(email);

    let user = await user_api.findByEmail(email);

    // if (user !== {}) {
    //   return res
    //     .status(400)
    //     .json({ errors: { message: "User already exists", user: user } });
    // } else {
    const response = await user_api.createUser(req.body);
    if (response.code === undefined)
      res.status(200).end(JSON.stringify(response));
    // }
  } catch (e) {
    console.log(e);
    res.status(500).end("Internal server error");
  }
});

router.post("/signin", async function (req, res) {
  try {
    console.log(req.body);
  } catch (e) {
    console.log(e);
    res.status(500).end("Internal server error");
  }
});

module.exports = router;
