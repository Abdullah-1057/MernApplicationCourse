const { response } = require("express");
const User = require("../models/user");
const Order = require("../models/order");

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((error, user) => {
    if (error || !user) {
      return res.status(400).json({
        error: "No user was found in DB",
      });
    }
    req.profile = user;
    next();
  });
};
exports.getUser = (req, res) => {
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;
  req.profile.createdAt = undefined;
  req.profile.updatedAt = undefined;
  return res.json(req.profile);
};

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile.id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (error, user) => {
      if (error || !user) {
        return res.status(400).json({
          error: "No user was found in DB",
        });
      }
      user.salt = undefined;
      user.encry_password = undefined;
      user.createdAt = undefined;
      user.updatedAt = undefined;
      return res.json({
        users: user,
      });
    }
  );
};
exports.userPurchaseList = (req, res) => {
  Order.find({ user: req.profile._id })
    .populate("user", "_id name")
    .exec((error, user) => {
      if (error || !user) {
        return res.status(400).json({
          error: "No order found",
        });
      }
      return res.json(order);
    });
};
exports.pushOrderOnPurchaseList = (req, res, next) => {
  let purchases = [];
  req.body.order.courses.forEach((course) => {
    purchases.push({
      _id: course._id,
      name: course.name,
      description: course.description,
      category: course.category,
      amount: req.body.order.amount,
      transaction_id: req.body.order.transaction_id,
    });
    User.findOneAndUpdate(
      { _id: req.profile.id },
      { $push: { purchases: purchases } },
      { new: true },
      (error, purchases) => {
        if (error) {
          return res.status(400).json({
            error: "No order found",
          });
        }
        next();
      }
    );
  });
};

// exports.getAllUsers = (req,res)=>{
//     User.find().exec((error,user)=>{
//         if(error || !user)
//         {
//             return res.status(400).json({
//                 error: "No user was found in DB"
//             })
//         }
//         return res.json({
//             users: user
//         })
//     });
// };
