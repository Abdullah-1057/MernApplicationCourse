const { response } = require("express");
const PDF = require("../models/assesAns");
const formidable = require("formidable");
const fs = require("fs");
const _ = require("lodash");

exports.getassesmentByIdAns = (req, res, next, id) => {
  PDF.findById(id)
    .exec((error, assesmentAns) => {
      if (error || !assesmentAns) {
        return res.status(400).json({
          error: "No assesment was found in DB",
        });
      }
      req.assesmentAns = assesmentAns;
      next();
    });
};

exports.createassesmentAns = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image",
      });
    }
    

    let course = new PDF(fields);

    //handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size too big!",
        });
      }
      course.photo.data = fs.readFileSync(file.photo.path);
      course.photo.contentType = file.photo.type;
    }

    //save to the DB
    course.save((err, course) => {
      if (err) {
        res.status(400).json({
          error: "Saving tshirt in DB failed",
        });
      }
      res.json(course);
    });
  });
};