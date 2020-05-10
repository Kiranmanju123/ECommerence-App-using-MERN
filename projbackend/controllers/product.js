const Product = require("../models/product");
const formidable = require("formidable")
const _ = require("lodash")
const fs = require("fs")

exports.getProductById= (req,res,next,id)=> {
    Product.findById(id)
    .populate("category")
    .exec((err,product)=> {
        if(err) {
            return res.status(400).json({
                error: "Product not found in db"
            })
        }

        req.product = product;
        next();
    })



}

exports.createProduct= (req,res)=> {
    let form =new formidable.IncomingForm();
    form.keepExtensions = true

    form.parse(req,(err,fields,file)=> {
        if(err) {
            return res.status(400).json({
                error: "Problem with the image"
            })
        }

        //destructure the fields
        const {name,description,price,catagory,stock} = fields
        if(!name || !description || !price || !catagory || !stock) {
            return res.status(400).json({
                error: "All fields are required"
            })
        }

        //restrictions on fields

        let product = new Product(fields)

        //handling files here
        if(file.photo) {
            if(file.photo.size > 3000000) {
                return res.status(400).json({
                    error: "Image Size is too big Sorry!!!"
                })
            }
        
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type
        }
        // console.log(product)
        
        //save to DB
        product.save((err,product)=> {
            if(err) {
                res.status(400).json({
                    error: "Error saving product in db"
                })
            }
            res.json(product)
        })

    })

}

exports.getProduct= (req,res)=> { //get indiuivual product
    req.product.photo = undefined
    return res.json(req.product)

}

//middleware for photo

exports.photo = (req,res,next)=> {
    if(req.product.photo.data){
        res.set("Content-Type",req.product.photo.contentType)
        return res.send(req.product.photo.data)
    }
    next();
}

exports.deleteProduct = (req,res)=> {  //delete the product
    let product =req.product;
    product.remove((req,product)=> {

        if(error)
        {
            return res.status(400).json({
                error : "Failed to delete the product"
            })


        }

        res.json({
            message: `Succesfully deleted the ${product} product `
        })

    })

}

exports.updateProduct= (req,res)=> {

    let form =new formidable.IncomingForm();
    form.keepExtensions = true

    form.parse(req,(err,fields,file)=> {
        if(err) {
            return res.status(400).json({
                error: "Problem with the image"
            })
        }

      

        //update code
        let product = req.product
        product = _.extend(product,fields)

        //handling files here
        if(file.photo) {
            if(file.photo.size > 3000000) {
                return res.status(400).json({
                    error: "Image Size is too big Sorry!!!"
                })
            }
        
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type
        }
        // console.log(product)
        
        //save to DB
        product.save((err,product)=> {
            if(err) {
                res.status(400).json({
                    error: "Updation of product failed"
                })
            }
            res.json(product)
        })

    })

}

//controller for listing all products in the home page
exports.getAllProducts= (req,res)=> {
    let limit = req.query.limit ? parseInt(req.query.limit) : 8  //user can define how many product to display
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id"
    Product.find()
    .select("-photo")   //- means dont select the photo from db
    .populate("category")
    .sort([[sortBy,"asc"]])
    .limit(limit)
    .exec((err,product)=> {
        if(err) {
            return res.status(400).json({
                error: "No Product Found"
            })
        }
        res.json(product)
    })

}

//get all category
exports.getAllUniqueCategory= (req,res) => {
  Product.distinct("category", {}, (err,category)=> {
      if(err) {
          return res.status(400).json({
              error : "No Category found"
          })
      }
      res.json(category)
  })
}

//middleware for stock and sold as soon as product sold stock should get decearsed by 1
exports.updateStock = (req,res,next)=> {
    let myOperations = req.body.order.products.map(prod => {
        return {
            updateOne: {
                filter: {_id: prod._id},
                update : {$inc: {stock: -prod.count, sold: +prod.count}}
            }
        }
    })

    Product.bulkWrite(myOperations, {}, (err,products)=> {
        if(err) {
            return res.status(400).json({
                error : "bulk operation failed"
            })
        }
        next();
    })

    

}

