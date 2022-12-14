const userModel = require("../models/users");
const tumblerModel = require("../models/tumblers");
const rentalHistory = require("../models/rentalHistory");
// const { findOneAndUpdate } = require("../models/tumblers");

const createTumblers = async (body) => {
  try {
    const data = await tumblerModel.create(body);
    return data;
  } catch (e) {
    console.log(e);
    return e;
  }
};

const createRentalHistory = async (body) => {
  const { email, tumblerId } = body;

  const userData = await userModel.findOne({ email });
  console.log(userData._id);
  const tumblerData = await tumblerModel.findOne({ tumblerId });
  console.log(tumblerData);

  const today = new Date();
  const dueDate = new Date();
  const tDate = today.getDate();
  dueDate.setDate(tDate + 7);

  if (tumblerData.tumblerAvailability === true) {
    try {
      let body = {
        userId: userData._id,
        tumblerId: tumblerData._id,
        tumblerNum: tumblerId,
        dueDate: dueDate,
        rentalDate: today,
      };

      await tumblerModel.findOneAndUpdate(
        { tumblerId },
        { tumblerAvailability: false, tumblerStatus: 1 }
      );

      const response = await rentalHistory.create(body);
      return response;
    } catch (e) {
      console.log(e);
      return e;
    }
  } else {
    return 400;
  }
};

const updateReturnHistory = async (body) => {
  const { tumblerId } = body;
  const tumblerData = await tumblerModel.findOne({ tumblerId });
  const today = new Date();

  let rentalData = await rentalHistory.find({
    tumblerId: tumblerData._id,
  });

  console.log("before", rentalData);

  rentalData = rentalData.filter((el) => el.returnDate === undefined);

  console.log("after", rentalData);

  if (tumblerData.tumblerStatus !== 1) {
    return 400;
  } else {
    console.log(rentalData[0]._id);
    if (rentalData[0].dueDate > today) {
      console.log("here");
      await rentalHistory
        .findOneAndUpdate(rentalData[0]._id, {
          returnDate: new Date(),
        })
        .then((v) => console.log(v));
      // await rentalHistory.findOne(rentalData[0]).then((v) => console.log(v));

      await tumblerModel.findOneAndUpdate(
        { tumblerId },
        {
          tumblerAvailability: true,
          tumblerStatus: 3,
        }
      );
      return true;
    } else {
      return 403;
    }
  }
};

const findAllRentalHistories = async (body) => {
  const { email } = body;

  const userData = await userModel.findOne({ email });
  const userId = userData._id;

  let rentalHistoryData;

  await rentalHistory.find({ userId }).then((v) => (rentalHistoryData = v));

  return rentalHistoryData;
};

module.exports = {
  createTumblers,
  createRentalHistory,
  updateReturnHistory,
  findAllRentalHistories,
};
