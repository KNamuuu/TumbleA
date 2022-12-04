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
        dueDate: dueDate,
        rentalDate: today,
      };
      console.log(body);

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

const updateReturnHistory = async (body) => {};

module.exports = {
  createTumblers,
  createRentalHistory,
};
