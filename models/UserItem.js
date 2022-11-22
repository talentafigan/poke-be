const mongoose = require("mongoose");
const schema = mongoose.Schema;

const UserItemSchema = new schema({
  nickname: {
    type: String,
    required: true,
  },
  item: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  version: {
    type: Number,
    required: false,
    default: 0,
  },
});

module.exports = UserItem = mongoose.model("user_item", UserItemSchema);
