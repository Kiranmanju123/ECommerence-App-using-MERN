const User = require("../models/user")
const Order = require("../models/order")

exports.getUserById = (req,res,next,id) => {  //works with the param like middleware
    User.findById(id).exec((err,user)=>{
        if(err || !user) {
            return res.status(400).json({
                error:"No user found in DB"
            });
        }
        req.profile = user  //profile is property from frontend
        next();
    })
}

// exports.getAllUsers= (req,res) => {   //get all the users from the database
//    User.find().exec((err,user)=> {
//     if(err || !user)  {
//         return res.status(400).json({                  
//            "message": "User  not found!!!"

//          })
//      }
//      return res.json({user})
//    })

// }


//when someone calls this  method just grab the user
exports.getUser = (req,res) => {
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    req.profile.createdAt = undefined;
    req.profile.updatedAt =undefined;
    return res.json(req.profile)  //from above variable
}

exports.updateUser= (req,res)=> {    //update the user
    User.findByIdAndUpdate(
        {_id : req.profile._id},
        {$set : req.body},
        {new: true, useFindAndModify: false},
        (err,user)=> {
            if(err) {
                return res.status(400).json({
                    error: "you are not authorized oops"
                })
            }
            user.salt = undefined;
            user.encry_password = undefined;
            
            res.json(user)

        }
    )

}

exports.userPurchaseList= (req,res)=> {
    Order.find({user:req.profile._id})
    .populate("user","_id name")
    .exec((err,order)=> {
        if(err){
            return res.status(400).json({
                error:"No order in this account"
            })
        }
        return res.json(order)
    })

}

//middleware
exports.pushOrderInPurchaseList = (req,res,next)=> {
    let purchases = []
    req.body.order.products.forEach(product=> {
        purchases.push({
            _id : product._id,
            name : product.name,
            description: product.description,
            catagory:product.catagory,
            quantity:product.quantity,
            amount: req.body.order.amount,
            transcation_id: req.body.order.transcation_id

        })
    })

    //store in db
    User.findOneAndUpdate(
        {_id : req.profile._id},
        {$push:{purchases:purchases}},
        {new : true},
        (err,purchases)=> {
            if(err){
                return res.status(400).json({
                    error : "Unable to save purchase list"
                })
            }
            next()
        }
        )
    
}
