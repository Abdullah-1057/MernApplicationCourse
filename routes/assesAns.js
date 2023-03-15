const express = require('express')
const router = express.Router()
const {getUserById} = require('../controllers/user')
const {isSignedIn,isAdmin,isAuthenticated} = require('../controllers/auth')
const {createassesmentAns,getassesmentByIdAns} = require('../controllers/assesAns')


//params
router.param("userId",getUserById);
router.param("assesmentId",getassesmentByIdAns);

//create
router.post("/assesmentAns/create/:userId",isSignedIn,isAuthenticated,isAdmin,createassesmentAns); 
//read a Course
// router.get("/assesment/:assesmentId",getassesmentAns);
// router.get("/assesments",getAllassesmentsAns); 

module.exports = router;