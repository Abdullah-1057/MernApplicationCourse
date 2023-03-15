const mongoose = require('mongoose');
const optionSchema = new mongoose.Schema({

    optionsData: {
        type: String,
        required: true,
        trim: true,
        maxlength: 32,
      },
      isCorrect:{
        type: Boolean,
        default: false
      }
},{timestamps:true});

module.exports = mongoose.model("Options",optionSchema);