const { response } = require("express");
const Assesment = require("../models/assesment");

exports.getassesmentById = (req, res, next, id) => {
  Assesment.findById(id)
    .exec((error, assesment) => {
      if (error || !assesment) {
        return res.status(400).json({
          error: "No assesment was found in DB",
        });
      }
      req.assesment = assesment;
      next();
    });
};

exports.createassesment = (req, res) => {
 
    // const { questionText, answerOption1, answerOption2, answerOption3, answerOption4, answer} = fields;
    let assesment = new Assesment(req.body);
    console.log(req.body)
    //save to the DB
    assesment.save((err, assesment) => {
      if (err) {
        res.status(400).json({
          error: "Saving Assesment in DB failed",
        });
      }
      res.json(assesment);
    });
  }

exports.getassesment = (req, res) => {
  return res.json(req.assesment);
};



exports.getAllassesments = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

  Assesment.find()
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, assesments) => {
      if (err) {
        return res.status(400).json({
          error: "NO assesment FOUND",
        });
      }
      res.json(assesments);
    });
};
