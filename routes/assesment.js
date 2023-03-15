const express = require('express')
const router = express.Router()
const {getUserById} = require('../controllers/user')
const {isSignedIn,isAdmin,isAuthenticated} = require('../controllers/auth')
const {createassesment,getassesmentById,getassesment,getAllassesments} = require('../controllers/assesment.js')


//params
router.param("userId",getUserById);
router.param("assesmentId",getassesmentById);

//create
router.post("/assesment/create/:userId",isSignedIn,isAuthenticated,isAdmin,createassesment); 
//read a Course
router.get("/assesment/:assesmentId",getassesment);
router.get("/assesments",getAllassesments); 

module.exports = router;