const express = require('express')
const router = express.Router()
const {getUserById} = require('../controllers/user')
const {isSignedIn,isAdmin,isAuthenticated} = require('../controllers/auth')
const {getCourseById,createCourse,getCourse,photo,updateCourse,removeCourse,getAllCourses,getAllUniqueCategories} = require('../controllers/course')


//params
router.param("userId",getUserById);
router.param("courseId",getCourseById);

//create
router.post("/course/create/:userId",isSignedIn,isAuthenticated,isAdmin,createCourse); 
//read a Course
router.get("/course/:courseId",getCourse);
router.get("/course/photo/:courseId",photo);
router.get("/courses",getAllCourses);

//update
router.put("/course/:courseId/:userId",isSignedIn,isAuthenticated,isAdmin,updateCourse);
//delete
router.delete("/course/:courseId/:userId",isSignedIn,isAuthenticated,isAdmin,removeCourse);

module.exports = router;