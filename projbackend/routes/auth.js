var express = require('express')
var router = express.Router()
const { check } = require('express-validator');

const {signup,signin,signout,isSignedIn} = require("../controllers/auth")


router.post("/signup",
[
    check("name").isLength({min:3}).withMessage('Name be at least 5 chars long'),
    check("email").isEmail().withMessage('Email is required'),
    check("password").isLength({min:3}).withMessage("password should be alteast 3 charcter lond")


],signup) //controller


router.post("/signin",
[
    check("email").isEmail().withMessage('Email is required'),
    check("password").isLength({min:3}).withMessage("password is required and should be alteast 3 charcter long")


],signin) //controller



router.get("/signout",signout)

router.get("/testroute",isSignedIn,(req,res)=>{
    res.json(req.auth)
})

module.exports = router