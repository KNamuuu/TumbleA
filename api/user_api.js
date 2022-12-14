const bcrypt = require("bcrypt");

const userModel = require("../models/users");

const createUser = async (body) => {
  const { email, password, username } = body;

  try {
    const data = await userModel.create({
      email: email,
      password: bcrypt.hashSync(password, 10),
      username: username,
    });
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

    const validPassword = await bcrypt.compare(body.password, data.password);

    if (validPassword) return data;
    else return 404;
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
