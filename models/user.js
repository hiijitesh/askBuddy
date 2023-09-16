const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      select: false,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    username: {
      type: String,
      require: true,
    },
    questionCount: {
      type: Number,
      default: 0,
    },
    AnswerCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
