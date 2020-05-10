const User = require("../models/user")
const { check, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');

exports.signup = (req,res)=> {
    const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array()[0].msg});
  }
   const user = new User(req.body)  //Object from User schema  //Saving users to the database
   user.save((err,user)=> {
       if(err) {
           return res.status(400).json({
               "message": "Not able to save user in databasd"
           })
       } 
       res.json({
           name:user.name,
           email:user.email,
           id:user._id
       })
   })
}

exports.signin = (req,res)=> {
    const {email,password} = req.body  //(destructing) extracting only email and password from req.body
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array()[0].msg});
      }
      User.findOne({email}, (err,user)=> {
          if(err || !user)  {
             return res.status(400).json({                   //if email does not match
                "message": "User email not found!!!"

              })
          }

          if(!user.authenticate(password)){  //if password does not match
            return res.status(401).json({
                "message": "User email and password do not match!!!"
        })

          }
      //create token
          const token = jwt.sign({   _id: user.id },process.env.SECRET)

    //put token in user cookie
    res.cookie("token",token,{expire: new Date() + 9999})

    // send reponse to front end
    const {_id,name,email,role} = user;
    return res.json({token,user:{_id,name,email,role}})


         
      })




}

exports.signout = (req,res)=> {   //json response from the server
   res.clearCookie("token") 
    res.json({
        "message":"User signout Succesfully"
    })
};


//protected routes
exports.isSignedIn = expressJwt({  //to check wheather he is logged in //middleware
    secret:process.env.SECRET,
    userProperty : "auth"
})

//custom middleware

exports.isAuthenticated = (req,res,next)=> {
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if(!checker) {
        return res.status(403).json({
            error:"ACCESS DENIED"
        })
    }
    next();
}

exports.isAdmin = (req,res,next)=> {
    if(req.profile.role === 0){
        res.status(403).json({
            error:"You are not admin Acces denied "
        })
    }
    next();
}
