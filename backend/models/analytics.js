const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Analytics = new Schema(
  {
    //------------
    IDU: {
      type: String,
    },
    age: {
      type: Number,
    },
    country: {
      type: String,
    },
    city: {
      // dato de cloudinary
      type: String,
    },
    tCreated: {
      // dato de cloudinary
      type: String,
    },
    tTFinished: {
      // dato de cloudinary
      type: String,
    },
    scrims: {
      type: String,
    },
  },
  {
    //Creado el dia y usado el dia
    timestamps: true,
  }
);

module.exports = model('Analytics', Analytics);
