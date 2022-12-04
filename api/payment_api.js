const paymentModel = require("../models/payment");
const user_api = require("./user_api");

const createPayment = async (body) => {
  const { email, cardNum, validationDate, birth, cardPW } = body;

  try {
    const id = await user_api.getIdfromEmail(email);
  } catch (e) {
    console.log(e);
    return e;
  }
};
