var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  }, // 유저 email

  password: {
    type: String,
    required: true,
  }, // 유저 password

  username: {
    type: String,
    required: true,
  }, // 유저 이름(nickname)

  deadline: {
    type: Date,
  }, // 연체일의 마지막 날 (없으면 null)

  availavility: {
    type: Boolean,
  }, // 유저의 대여 가능여부 (오늘이 deadline전이면 false, deadline이 없거나 지난경우 true)

  point: {
    type: Number,
  }, // 유저가 보유하고 있는 포인트

  borrowing: {
    type: Boolean,
  }, // 유저가 대여 하고있는지에 대한 여부
});

module.exports = mongoose.model("user", userSchema);
