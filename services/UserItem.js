const UserItem = require("../models/UserItem");

module.exports = {
  findOne(item) {
    return UserItem.findOne({
      item,
    });
  },
  get(query) {
    return UserItem.find(query);
  },
  create(payload) {
    const newUserItem = new UserItem(payload);
    return newUserItem.save();
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
