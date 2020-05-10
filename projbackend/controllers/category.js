const Catagory = require("../models/catagory");


//middle ware
exports.getCategoryById=(req,res,next,id)=> {
    Catagory.findById(id).exec((err,cate)=> {
        if(err) {
            return res.status(400).json({
                error: "cataogory not found in db"
            })
        }

        req.category = cate;
        next();
    })
  


}

exports.createCatagory = (req,res) => {   //saving catagory to db
    const category = new Catagory(req.body)
    category.save((err,category)=> {
        if(err) {
            return res.status(400).json({
                error: "Not able to save category in db"
            })
        }
        res.json({category})

    })
    
}

exports.getcategory=(req,res)=> {          //only one category
    return res.json(req.category)

}

exports.getAllcategory=(req,res)=> {          //get all category
    Catagory.find().exec((err,categories)=> {
        if(err)
        {
            return res.status(400).json({
                error : "No Category found"
            })

        }
        res.json(categories)
    })

}

exports.updatecategory= (req,res)=> {  //update category
    const category = req.category;
    category.name = req.body.name;
    category.save((err,updatedcategory)=> {
        if(err)
        {
            return res.status(400).json({
                error : "Failed to uddate the Category"
            })


        }
        res.json(updatedcategory)

    })

    


}
// delete category
exports.removecategory=(req,res)=> {
    const category = req.category;
    category.remove((err,category)=>{
        if(err)
        {
            return res.status(400).json({
                error : "Failed to delete the Category"
            })


        }

        res.json({
            message: `Succesfully deleted the ${category} category `
        })

    })
    


}