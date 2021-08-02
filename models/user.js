const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// create user schema and mongoose.model
const userSchema = new mongoose.Schema({
  role: {
    type: String,
    required: [true, "must be filled"]
  },
  username: {
    type: String,
    required: [true, "must be filled"],
  },
  password: {
    type: String,
    required: [true, "must be filled"],
  },
  token: {
    type: String,
  },
  refreshTokens: {
    type: String,
  }
});

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model("user", userSchema);
