var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var paymentSchema = new Schema({
  userId: { type: Number, required: true, unique: true }, // 유저 index
  cardNum: { type: Number, required: true, unique: true }, // 카드 번호
  validationDate: { type: Date, required: true }, // 카드 유효기간 MM/YY
  birth: { type: Date, required: true }, // 유저 생년월일
  cardPw: { type: Number, required: true }, // 카드 비밀번호
});

module.exports = mongoose.model("payment", paymentSchema);
