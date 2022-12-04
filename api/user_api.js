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

const findUser = async (body) => {
  const { email, password } = body;

  try {
    const data = await userModel.findOne({ email });

    if (data) {
      if (data.password === password) return data;
      else return 404;
    } else return data;
  } catch (e) {
    console.log(e);
    return e;
  }
};

const findAllUsers = async () => {
  try {
    const data = await userModel.find({});

    console.log(data);
    return data;
  } catch (e) {
    console.log(e);
    return e;
  }
};

const getIdFromEmail = async (email) => {
  try {
    const id = await userModel.findOne({ email }).then((v) => v._id);

    return id;
  } catch (e) {
    console.log(e);
    return e;
  }
};

module.exports = {
  createUser,
  findByEmail,
  findUser,
  findAllUsers,
  getIdFromEmail,
};
