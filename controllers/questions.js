const { response } = require("express");
const MCQ = require("../models/questions");
const formidable = require("formidable");
const fs = require("fs");
const _ = require("lodash");

exports.getMCQById = (req, res, next, id) => {
  MCQ.findById(id)
    .exec((error, mcqs) => {
      if (error || !mcqs) {
        return res.status(400).json({
          error: "No mcqs was found in DB",
        });
      }
      req.mcqs = mcqs;
      next();
    });
};

exports.createMCQ = (req, res) => {
 
    // const { questionText, answerOption1, answerOption2, answerOption3, answerOption4, answer} = fields;
    let mcqs = new MCQ(req.body);
    console.log(req.body)
    //save to the DB
    mcqs.save((err, mcqs) => {
      if (err) {
        res.status(400).json({
          error: "Saving MCQ in DB failed",
        });
      }
      res.json(mcqs);
    });
  }

exports.getMcq = (req, res) => {
  return res.json(req.mcqs);
};

// //delete route
// exports.removeMcq = (req, res) => {
//   let mcqs = req.mcqs;
//   mcqs.remove((error, mcqs) => {
//     if (error) {
//       return res.status(400).json({
//         error: "Failed to delete",
//       });
//     }
//     return res.json({ message: "Succesfuly deleted : ", mcqs }); //
//   });
// };
// //update route
// exports.updateMcq = (req, res) => {
//   let form = new formidable.IncomingForm();
//   form.keepExtensions = true;

//   form.parse(req, (err, fields, file) => {
//     if (err) {
//       return res.status(400).json({
//         error: "problem with image",
//       });
//     }
//     //destructure the fields
//     const { name, description, price } = fields;

//     let mcqs = req.mcqs;
//     mcqs = _.extend(mcqs, fields);
//     //handle file here
   
//     //save to the DB
//     mcqs.save((err, mcqs) => {
//       if (err) {
//         res.status(400).json({
//           error: "Updation tshirt in DB failed",
//         });
//       }
//       res.json(mcqs);
//     });
//   });
// };
// //listing route

exports.getAllMcqs = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

  MCQ.find()
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, mcqss) => {
      if (err) {
        return res.status(400).json({
          error: "NO mcqs FOUND",
        });
      }
      res.json(mcqss);
    });
};
