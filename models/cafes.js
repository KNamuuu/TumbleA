var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var cafeSchema = new Schema({
  cafeId: { type: Number, required: true, unique: true }, // 카페 index
  cafeName: { type: String, required: true }, // 카페 이름
  cafeLng: { type: Number }, // 카페 경도
  cafeLon: { type: Number }, // 카페 위도
  cafeAddress: { type: String }, // 카페 주소
  cafeStartHour: { type: Number }, // 카페 시작 시간(시간)
  cafeStartMinute: { type: Number }, // 카페 시작 시간(분)
  cafeEndHour: { type: Number }, // 카페 종료 시간(시간)
  cafeEndHour: { type: Number }, // 카페 종료 시간(분)
  cafeTime: { type: String }, // 카페 설명 (간단한 소개)
  tumblerCnt: { type: Number }, // 텀블러 보유 수량
});

module.exports = mongoose.model("cafes", cafeSchema);
