const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator');
const {getUserById,getUser,updateUser,userPurchaseList} = require('../controllers/user')
const {isSignedIn,isAdmin,isAuthenticated} = require('../controllers/auth')

router.param("userId",getUserById);
router.get("/user/:userId",isSignedIn,isAuthenticated,getUser);
router.put("/user/:userId",isSignedIn,isAuthenticated,updateUser);
router.put("/order/user/:userId",isSignedIn,isAuthenticated,userPurchaseList);

// router.get("/users",getAllUsers);

module.exports = router;