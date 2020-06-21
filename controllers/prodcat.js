const ProdCat = require('../models/prodcat');
const Product = require('../models/product');


exports.createProductByCategory = async (req, res) => {
    const { categories } = req.body
    const x = await ProdCat.find()
    if(x){
      return res.status(200).json({
        message:"Already existed"
      })
    }
     const newProdCat = ProdCat({
       prodcat: categories
     })
    await newProdCat.save((err,result) => {
      if(err){
        return res.status(400).json({
          error: err
        })
      }
      res.status(200).json({
        result
      })
    })
};


exports.updateProductByCatgory = async (req,res) => {
  const { categories } = req.body
  const x = await ProdCat.find()
  const pdt = x[0]
  ProdCat.findByIdAndUpdate({_id: pdt._id}, {prodcat: categories}, (err,result) => {
    if(err){
      return res.status(400).json({
        error: err
      })
    }
    res.status(200).json({
      message:"Updated"
    })
  })
}

exports.getProductByCategory = async (req,res) => {
    const categoryIDs = await ProdCat.find();
    const categoryIDArray = categoryIDs[0].prodcat;
    var data = [];
    var fuck;

   for(fuck = 0; fuck < categoryIDArray.length; fuck++){
     let _id = categoryIDArray[fuck]
     const product = await Product.find({ category: _id }).select('name price slug').sort({ createdAt: -1 }).limit(10)
     data.push(product)
     if(fuck + 1  == categoryIDArray.length){
       res.json(data)
       return;
     }
   }
}
