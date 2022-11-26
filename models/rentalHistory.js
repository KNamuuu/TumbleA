var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var historySchema = new Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
    unique: true,
    ref: "user",
  }, // 유저 index user document에서 참조
  tumblerId: { type: Number, required: true, unique: true }, // 텀블러 index tumbler document에서 참조
  dueData: { type: Date, required: true }, // 반납 기한 (반납 기간의 마지막 날)
  rentalDate: { type: Date, required: true }, // 대여 날짜
  returnDate: { type: Date }, // 반납 날짜
  cafeName: { type: String }, // 반납 카페 이름
});

module.exports = mongoose.model("rentalHistory", historySchema);
