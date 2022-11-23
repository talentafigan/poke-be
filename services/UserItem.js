const UserItem = require("../models/UserItem");

module.exports = {
  findOne(item) {
    return UserItem.findOne({
      item,
    });
  },
  get(user) {
    return UserItem.find({
      user,
    });
  },
  create(payload) {
    const newUserItem = new UserItem(payload);
    return newUserItem.save();
  },
  delete(item) {
    return UserItem.findOneAndDelete({
      item,
    });
  },
  update(id, payload) {
    return UserItem.findOneAndUpdate(
      {
        id,
      },
      {
        $set: payload,
        $inc: {
          version: 1,
        },
      },
      { new: true }
    );
  },
};
