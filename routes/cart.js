const express = require("express");
const router = express.Router();

const {
addIntoCart,
removeFromCart
} = require("../controllers/cart");

const { requireSignin } = require("../controllers/auth");




//ADD PRODUCT INTO CART ROUTE
router.post("/cart/add-product", addIntoCart);

// // PRODUCT BY ID ROUTE
// router.get("/category/:categoryId", getCategoryById);

// REMOVE FROM THE CART ROUTE
router.delete("/cart/remove-product/:cartProductId",removeFromCart);

// //UPDATE CATEGORY BY ID ROUTE
// router.patch("/category/:categoryId", updateCategory);
//
// //LIST OF CATEGORY ROUTE
// router.get("/categories", getAllCategory);

module.exports = router;
