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

router.post("/return", async function (req, res) {
  try {
    let response = await tumbler_api.updateReturnHistory(req.body);
    // console.log(response);
    if (response === 400) {
      res.status(400).end("대여중인 텀블러가 아닙니다.");
    } else if (response === 401) {
      res.status(403).end("반납 기한이 지났습니다.");
    } else {
      res.status(200).end("반납처리가 완료되었습니다.");
    }
  } catch (e) {
    console.log(e);
    return e;
  }
});

router.post("/rentalhistory", async function (req, res) {
  await tumbler_api
    .findAllRentalHistories(req.body)
    .then((v) => res.status(200).send(v));
});

module.exports = router;
