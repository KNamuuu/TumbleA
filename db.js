const mongoose = require("mongoose");
module.exports = () => {
  function connect() {
    // mongoose.connect(
    // "mongodb://127.0.0.1:27017/TumbleA",
    mongoose.connect(
      process.env.MONGODB_URI ||
        "mongodb+srv://test:test@ajou-tumblea.km5xtqc.mongodb.net/?retryWrites=true&w=majority",
      function (err) {
        if (err) {
          console.error("mongodb connection error", err);
          return;
        }
        //   console.log("mongodb connected");
        console.log("DB is connected");
      }
    );
  }
  connect();
  mongoose.connection.on("disconnected", connect);
  require("./models/users.js");
  require("./models/tumblers.js");
  require("./models/payment.js");
  require("./models/cafes.js");
  require("./models/rentalHistory.js");
};
