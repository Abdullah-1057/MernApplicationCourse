const mongoose = require('mongoose');
const crypto = require("crypto");
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
  
  name: {
    type: String,
    required:  true,
    maxlength: 32,
    trim: true
  },
  lastname: {
    type: String,
    maxlength: 32,
    trim: true
  },
  userinfo: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    required:true,
    trim: true,
    unique: true
  },
  encry_password: {
    type: String,
    required: true,
  },
  salt: String,

  role:{
    type: Number,
    default: 0, 
  },
  purchases:{
    type: Array,
    default: [], 
  }
}, {timestamps:true});

userSchema.virtual("password").set(function(password){this._password = password; 
  this.salt = uuidv4(); this.encry_password = this.securePassword(password)}).get(
  function(){
    return this._password;
  }
)

userSchema.methods = {
  autheticate: function(plainpassword) {
    return this.securePassword(plainpassword) === this.encry_password;
  },


  securePassword : function (plainPassword)
  {
    if(!plainPassword)
    {
      return "";
    }
    try{
      return crypto.createHmac('sha256', this.salt).update(plainPassword).digest('hex');
    }
    catch (error){
      return "";
    }
  },
 
}
module.exports = mongoose.model("User",userSchema)





