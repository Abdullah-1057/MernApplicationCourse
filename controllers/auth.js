
const { check, validationResult } = require('express-validator');
const User = require("../models/user");
var jwt = require('jsonwebtoken');
var expressjwt = require("express-jwt");


// signout
exports.signout = (req, res) => {
  res.clearCookie("token");
  res.send("user Signout");
};
// signup
exports.signup = (req, res) => {
  const user = new User(req.body);

  const errors = validationResult(req);
  if(!errors.isEmpty())
  {
    return res.status(422).json({
      error: errors.array()[0].msg,
      parameter: errors.array()[0].param
    })
  }
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: err
      });
    }
    res.json({
        name: user.name,
        email: user.email,
        id: user._id
      });
  });
};
//sign in
exports.signin = (req, res) => {
  const errors = validationResult(req);
  const {email,password} = req.body;

  if(!errors.isEmpty())
  {
    return res.status(422).json({
      error: errors.array()[0].msg,
      parameter: errors.array()[0].param
    })
  }
 
  User.findOne({email}, (error,user) => {
    //get complete user from database from this email
    if(error || !user)
    {
      return res.status(400).json({
        error: 'user email does not exsist'
      })
    }
    // this particular instace of user authentication and cheking
    
    if (!user.autheticate(password)) {
      return res.status(401).json({
        error: "Email and password do not match"
      });
    }

    var token = jwt.sign({ _id: user._id }, process.env.SECRET);
    res.cookie("token",token,{expire: new Date() + 9999 });
    const {_id,name,email,role} = user;
    return res.json({token, user: {_id,name,email,role}});
  })
};

//protected routes
exports.isSignedIn = expressjwt({
  secret: process.env.SECRET,
  userProperty: "auth"
});
//xustom routes
exports.isAuthenticated = (req,res,next)=>{
 let checker = req.profile && req.auth && req.profile._id == req.auth._id;
 if(!checker){
  return res.status(403).json({
    error: "ACCESS Denined"
  })
 }
 next();
};
 exports.isAdmin = (req,res,next)=>{
  if(req.profile.role===0){
   return res.status(403).json({
     error: "You are noot the admin ACCESS Denined"
   })
  }
  next();
};
//========================
