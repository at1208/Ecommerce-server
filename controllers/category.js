const Category = require("../models/category");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");




//CREATE CATEGORY
exports.createCategory = async (req, res) => {
   const { name } = req.body

   const category = new Category({ name })

    category.save((err,result) => {
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


// DELETE CATEGORY BY ID
exports.deleteCategory = (req, res) => {
  const _id = req.params.categoryId
   Category.findOneAndRemove({ _id }).exec((err, data) => {
       if (err) {
           return res.json({
               error: "Failed to delete category"
           });
       }
       res.json({
           message: 'category deleted successfully'
       });
   });
};

//UPDATE CATEGORY BY ID
exports.updateCategory = async (req, res) => {
  const updatedInfo =req.body
 const _id = req.params.categoryId
  await Category.findByIdAndUpdate({_id: _id}, updatedInfo).exec((err,result) => {
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


// LIST ALL CATEGORY
exports.getAllCategory = (req, res) => {

  Category.find()
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "NO product FOUND"
        });
      }
      res.json(products);
    });
};
