const HistoryAuth = require("../models/HistoryAuth");
const moment = require("moment");
const { v4 } = require("uuid");
const User = require("./User");

module.exports = {
  create(userId) {
    moment().locale("id");
    const newAuth = new HistoryAuth({
      createdAt: moment().format(),
      expiredAt: moment().add(7, "day").format(),
      token: v4(),
      user: userId,
    });
    return newAuth.save();
  },
  findByToken(token) {
    return HistoryAuth.findOne({
      token,
    });
  },
  validate(token) {
    return new Promise(async (resolve, reject) => {
      try {
        moment.locale("id");
        const findAuth = await HistoryAuth.findOne({
          token,
        });
        if (!findAuth) {
          reject();
        }
        const dateNow = moment();
        const dateExpired = moment(findAuth.expiredAt);
        if (!dateExpired.isAfter(dateNow)) {
          reject();
        }
        const findUser = await User.findOne(findAuth.user);
        resolve({
          user: findUser,
          auth: findAuth,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
};
