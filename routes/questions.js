const express = require('express')
const router = express.Router()
const {getUserById} = require('../controllers/user')
const {isSignedIn,isAdmin,isAuthenticated} = require('../controllers/auth')
const {createMCQ,getMCQById,getMcq,getAllMcqs} = require('../controllers/questions')


//params
router.param("userId",getUserById);
router.param("mcqId",getMCQById);

//create
router.post("/mcq/create/:userId",isSignedIn,isAuthenticated,isAdmin,createMCQ); 
//read a Course
router.get("/mcq/:mcqId",getMcq);
router.get("/mcqs",getAllMcqs);

//update
// router.put("/mcq/:mcqId/:userId",isSignedIn,isAuthenticated,isAdmin,updateMcq);
//delete
// router.delete("/mcq/:mcqId/:userId",isSignedIn,isAuthenticated,isAdmin,removeMcq);

module.exports = router;