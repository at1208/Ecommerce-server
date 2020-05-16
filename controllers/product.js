const Product = require("../models/product");
 

exports.getProductById = (req, res) => {
  Product.findById(req.params.productId)
    .exec((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "Product not found"
        });
      }
       res.json({
         result: product
       })
    });
};


//CREATE PRODUCT
exports.createProduct = async (req, res) => {
   const { name,
           description,
           price,
           category,
           stock,
           sold,
           photoURL } = req.body

   const product = new Product({
      name,
      description,
      price,
      category,
      stock,
      sold,
      photoURL
   })

    product.save((err,result) => {
      if(err){
        res.status(400).json({
          error: err
        })
      }
      res.status(200).json({
        result
      })
    })

};


// DELETE PRODUCT BY ID
exports.deleteProduct = (req, res) => {
  const _id = req.params.productId
   Product.findOneAndRemove({ _id }).exec((err, data) => {
       if (err) {
           return res.json({
               error: "Failed to delete product"
           });
       }
       res.json({
           message: 'Product deleted successfully'
       });
   });
};

//UPDATE PRODUCT BY ID
exports.updateProduct = async (req, res) => {
  const updatedInfo =req.body
 const _id = req.params.productId
 var event = await Product.findByIdAndUpdate({_id: _id}, updatedInfo).exec((err,result) => {
   if(err){
     res.status(400).json({
       error: "Failed to update"
     })
   }
   res.status(200).json({
     message:"Successfully updated",
     data: result
   })
 })

};


// LIST ALL PRODUCTS
exports.getAllProducts = (req, res) => {

  Product.find()
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "NO product FOUND"
        });
      }
      res.json(products);
    });
};
