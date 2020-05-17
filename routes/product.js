const express = require("express");
const router = express.Router();

const {
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductByFilter,
  searchProduct,
  getProductByName
} = require("../controllers/product");

const { requireSignin, adminMiddleware } = require("../controllers/auth");

const { createProductValidator } = require('../validators/product');
const { runValidation } = require('../validators/index')


//CREATE ROUTE
router.post("/product/create", createProductValidator, runValidation, createProduct);

// PRODUCT BY ID ROUTE
router.get("/product/:productId", getProductById);

// DELETE PRODUCT BY ID ROUTE
router.delete("/product/delete/:productId",deleteProduct);

//update route
router.patch("/product/:productId", updateProduct);

//LIST OF PRODUCT ROUTE
router.get("/products", getAllProducts);

//PRODUCT BY FILTER
router.get('/products/search', getProductByFilter);

//SEARCH PRODUCT
router.get('/product', searchProduct);

//GET PRODUCT BY NAME
router.get('/product/searchByName/:productName', getProductByName);

module.exports = router;
