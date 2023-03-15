const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator');
const {signout,signup, signin, isSignedIn} = require('../controllers/auth')


router.post('/signup', [
    check("name").isLength({min:3}).withMessage('must be at least 3 chars long'),
    check("email").isEmail().withMessage('Must be a proper email'),
    check("password").isLength({min:3}).withMessage('must be at least 3 chars long'),
],signup)

router.post('/signin', [
    check("email").isEmail().withMessage('Must valid email'),
    check("password").isLength({min:1}).withMessage('Enter valid password'),
],signin);


router.get('/signout',signout)

router.get('/isSignIn',isSignedIn,(req,res)=>{
    return res.send('signed In valid')
})

module.exports = router; 

