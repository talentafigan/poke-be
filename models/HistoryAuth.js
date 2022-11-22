const mongoose = require("mongoose");
const schema = mongoose.Schema;

const HistoryAuthSchema = new schema({
  token: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
  expiredAt: {
    type: String,
    required: true,
  },
});

module.exports = HistoryAuth = mongoose.model(
  "history_auth",
  HistoryAuthSchema
);
