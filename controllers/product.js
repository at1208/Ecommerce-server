const Product = require("../models/product");
const slugify = require('slugify');
const stripHtml = require('string-strip-html');

exports.getProductById = (req, res) => {
  Product.findById(req.params.productId)
    .populate('category')
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

  const slug = slugify(name).toLowerCase();
  const mtitle = `${name} | ${process.env.APP_NAME}`;
  const mdesc = stripHtml(description.substring(0, 160));

   const product = new Product({
      name,
      description,
      slug,
      mtitle,
      mdesc,
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
          error: "No product found"
        });
      }
      res.json(products);
    });
};

exports.getProductByFilter = (req, res) => {
  const query = req.query.category ? req.query : { price: { $gte: req.query.price } }

  Product.find(query)
    .select('_id category createdAt stock sold name description price slug')
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "No product found"
        });
      }
      res.json({
        result: products
      });
    });
};

//SEARCH PRODUCT
exports.searchProduct = (req,res) => {
  console.log(req.query);
  const { search } = req.query;
  if (search) {
      Product.find(
          {
              $or: [{ name: { $regex: search, $options: 'i' } }, { description: { $regex: search, $options: 'i' } }]
          },
          (err, pdt) => {
              if (err) {
                  return res.status(400).json({
                      error: "Failed to fetch products"
                  });
              }
              res.json(pdt);
          }
      )
  }

}

// GET PRODUCT BY NAME
exports.getProductByName = (req,res) => {
  Product.find({ name: req.params.productName })
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

}


// GET PRODUCT BY NAME
exports.getProductBySlug = (req,res) => {
  Product.findOne({ slug: req.params.productSlug })
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

}
