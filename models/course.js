const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 32,
      },
      description: {
        type: String,
        required: true,
        trim: true,
        maxlength: 2000,
      },
      price: {
        type: Number,
        required: true,
        trim: true,
        maxlength: 32,
      },
  
      sold:{
        type: Number,
        default: 0
      },
      photo:{
        data: Buffer,
        contentType: String
      },


},{timestamps:true});

module.exports = mongoose.model("Course",productSchema);