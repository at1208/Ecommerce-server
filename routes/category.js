const express = require("express");
const router = express.Router();

const {
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategory,
} = require("../controllers/category");

const { requireSignin, adminMiddleware } = require("../controllers/auth");

const { createCategoryValidator } = require('../validators/category');
const { runValidation } = require('../validators/index')


//CREATE CATEGORY ROUTE
router.post("/category/create", createCategoryValidator, runValidation, createCategory);


// DELETE CATEGORY BY ID ROUTE
router.delete("/category/delete/:categoryId",deleteCategory);

//UPDATE CATEGORY BY ID ROUTE
router.patch("/category/:categoryId", updateCategory);

//LIST OF CATEGORY ROUTE
router.get("/categories", getAllCategory);



module.exports = router;
