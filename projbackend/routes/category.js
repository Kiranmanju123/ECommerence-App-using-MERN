const express = require("express")
const router = express.Router();

const {getCategoryById,createCatagory,getcategory,getAllcategory,updatecategory,removecategory} = require("../controllers/category")
const {isSignedIn,isAuthenticated,isAdmin} = require("../controllers/auth")
const {getUserById} = require("../controllers/user")


//params
router.param("userId",getUserById)
router.param("categoryId",getCategoryById)

//actual routers goes here  whenever :params firesup the controller exceutes 
router.post("/category/create/:userId",isSignedIn,isAuthenticated,isAdmin,createCatagory)
                                                                          

//read
router.get("/category/:categoryId",getcategory)
router.get("/categories",getAllcategory)

//update
router.put("/category/:categoryId/:userId",isSignedIn,isAuthenticated,isAdmin,updatecategory)


//delete
router.delete("/category/:categoryId/:userId",isSignedIn,isAuthenticated,isAdmin,removecategory)


module.exports = router;


