const mongoose = require("mongoose");

const technicianSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
      required: true,
    },
    city:
    {
    type: String,
      required:true
    }
  },
  {
    timesstamp: true,
  }
);
const Technician = mongoose.model("Technician", technicianSchema);
module.exports = Technician;
