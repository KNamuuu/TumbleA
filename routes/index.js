var express = require("express");
var router = express.Router();

const tumbler_api = require("../api/tumbler_api");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/tumbler/add", async function (req, res) {
  try {
    let response = await tumbler_api.createTumblers(req.body);
    res.status(200).send(response);
  } catch (e) {
    console.log(e);
    return e;
  }
});

router.post("/rental", async function (req, res) {
  try {
    let response = await tumbler_api.createRentalHistory(req.body);
    console.log(response);
    if (response === 400) {
      res.status(400).end("이미 대여중인 텀블러 입니다.");
    } else {
      res.status(200).json({ message: "대여 성공", data: response });
    }
  } catch (e) {
    console.log(e);
    return e;
  }
});

module.exports = router;
