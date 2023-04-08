const mongoose = require("mongoose");

const parkingSchema = mongoose.Schema(
  {
    vehicleNumber: {
      type: String,
      required: true,
      unique: true,
    },
    vehicleType: {
      type: String,
      required: true,
    },
    dateTime: {
      type: String,
      required: true
    },
    exitTime: {
      type: String,
      required: true,
    },
    xoffset: {
      type: Number,
      required: true,
    },
    yoffset: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const parkingModel = mongoose.model("parkingModel", parkingSchema);
module.exports = parkingModel;
