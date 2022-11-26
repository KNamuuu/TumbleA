const userModel = require("../models/users");

const createUser = async (body) => {
  try {
    const data = await userModel.create(body);
    return data;
  } catch (e) {
    console.log(e);
    return e;
  }
};

const findByEmail = async (email) => {
  try {
    const data = await userModel.findOne({ email });
    return data;
  } catch (e) {
    console.log(e);
    return e;
  }
};

module.exports = {
  createUser,
  findByEmail,
};
