require("dotenv").config();
const mongoose = require("mongoose");

const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true })
    .then(() => {
      // eslint-disable-next-line no-console
      console.log(`Connected to MongoDB at ${process.env.MONGO_URI}`);
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = dbConnection;
