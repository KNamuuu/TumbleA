var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var tumblerSchema = new Schema({
  tumblerId: {
    type: Number,
    required: true,
    unique: true,
  }, // 텀블러 index
  tumblerAvailability: {
    type: Boolean,
    required: true,
  }, // 텀블러의 사용 가능여부(사용가능하다면 true, 대여 중 또는 파손 등으로 인한 사용불가상태이면 false)
  tumblerStatus: {
    type: Number,
    required: true,
  }, // 텀블러의 상태 (대여 중 이라면 1, 반납 완료 상태 라면 2, 세척완료 및 대여가능 상태이면 3)
});

module.exports = mongoose.model("tumbler", tumblerSchema);
