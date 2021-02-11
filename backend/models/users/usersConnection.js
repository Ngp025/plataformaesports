const mongoose = require('mongoose');

const UsersConectionSchema = new mongoose.Schema(
  {
    IDU: {
      type: String,
      default: -1,
    },
    location: {
      type: Object,
    },
    connection: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Connetion = mongoose.model(
  'UsersConection',
  UsersConectionSchema
);
