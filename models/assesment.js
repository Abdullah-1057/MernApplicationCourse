const mongoose = require("mongoose");

const assesmentSchema = new mongoose.Schema(
  {
    assesmentText: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Assesment", assesmentSchema);
