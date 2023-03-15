const { response } = require("express");
const Course = require("../models/course");
const formidable = require("formidable");
const fs = require("fs");
const _ = require("lodash");

exports.getCourseById = (req, res, next, id) => {
  Course.findById(id)
    .exec((error, course) => {
      if (error || !course) {
        return res.status(400).json({
          error: "No Course was found in DB",
        });
      }
      req.course = course;
      next();
    });
};

exports.createCourse = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image",
      });
    }
    //destructure the fields
    const { name, description, price} = fields;

    if (!name || !description || !price ) {
      return res.status(400).json({
        error: "Please include all fields",
      });
    }

    let course = new Course(fields);

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

exports.getCourse = (req, res) => {
  req.course.photo = undefined;
  return res.json(req.course);
};

exports.photo = (req, res, next) => {
  if (req.course.photo.data) {
    res.set("Content-Type", req.course.photo.contentType);
    return res.send(req.course.photo.data);
  }
  next();
};

//delete route
exports.removeCourse = (req, res) => {
  let course = req.course;
  course.remove((error, course) => {
    if (error) {
      return res.status(400).json({
        error: "Failed to delete",
      });
    }
    return res.json({ message: "Succesfuly deleted : ", course }); //
  });
};
//update route
exports.updateCourse = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image",
      });
    }
    //destructure the fields
    const { name, description, price } = fields;

    let course = req.course;
    course = _.extend(course, fields);
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
          error: "Updation tshirt in DB failed",
        });
      }
      res.json(course);
    });
  });
};
//listing route

exports.getAllCourses = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

  Course.find()
    .select("-photo")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, courses) => {
      if (err) {
        return res.status(400).json({
          error: "NO course FOUND",
        });
      }
      res.json(courses);
    });
};
// middlewware
exports.updateStock = (req, res, next) => {
  let myOperations = req.body.order.courses.map((prod) => {
    return {
      updateOne: {
        filter: { _id: prod._id },
        update: { $inc: {sold: +prod.count } },
      },
    };
  });

  Course.bulkWrite(myOperations, {}, (err, courses) => {
    if (err) {
      return res.status(400).json({
        error: "Bulk operation failed",
      });
    }
    next();
  });
};
