const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const mcqSchema = new mongoose.Schema(
  {
    questionText: {
      type: String,
      required: true,
      trim: true,
      maxlength: 255,
    },
  
    answerOption1: {
      type: String,
      required: true,
      trim: true,
      maxlength: 255,
    },
    answerOption2: {
      type: String,
      required: true,
      trim: true,
      maxlength: 255,
    },
    answerOption3: {
      type: String,
      required: true,
      trim: true,
      maxlength: 255,
    },
    answerOption4: {
      type: String,
      required: true,
      trim: true,
      maxlength: 255,
    },
    answer: {
      type: String,
      required: true,
      trim: true,
      maxlength: 255,
    },
      // answerOption1: { type: ObjectId, ref: Options },
    // answerOption2: { type: ObjectId, ref: Options },
    // answerOption3: { type: ObjectId, ref: Options },
    // answerOption4: { type: ObjectId, ref: Options },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MCQ", mcqSchema);
