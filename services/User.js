const User = require("../models/User");
const { v4 } = require("uuid");
const moment = require("moment");

module.exports = {
  findOne(id) {
    return User.findOne({
      id,
    });
  },
  findBy(query) {
    return User.findOne({
      query,
    });
  },
  get() {
    return User.find();
  },
  create(payload) {
    const newUser = new User({
      payload,
    });
    return newUser.save();
  },
  createGuest() {
    moment.locale("id");
    const newUser = new User({
      fullname: "Guest_" + moment().format("X"),
      id: v4(),
      status: "1",
      username: "guest_" + moment().format("X"),
      password: "Guest" + moment().format("X"),
    });
    return newUser.save();
  },
  update(id, payload) {
    return User.findOneAndUpdate(
      {
        id,
      },
      { $set: payload },
      { new: true }
    );
  },
};
