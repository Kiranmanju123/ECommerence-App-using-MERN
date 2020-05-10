var express = require('express')
var router = express.Router()

const {getUserById,getUser,updateUser,userPurchaseList} = require("../controllers/user")
const {isSignedIn,isAuthenticated,isAdmin} = require("../controllers/auth")

router.param("userId",getUserById)

// router.get("/users",getAllUsers) route for getting all the user



router.get("/user/:userId",isSignedIn,isAuthenticated,getUser)

//updateuser by put request
router.put("/user/:userId",isSignedIn,isAuthenticated,updateUser)
//purchase list
router.get("orders/user/:userId",isSignedIn,isAuthenticated,userPurchaseList)


module.exports = router