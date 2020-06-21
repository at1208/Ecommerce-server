const express = require("express");
const router = express.Router();

const {
addIntoCart,
removeFromCart,
getFromCart
} = require("../controllers/cart");

const { requireSignin } = require("../controllers/auth");


//ADD PRODUCT INTO CART
router.post("/cart/add-product", addIntoCart);

// // PRODUCT BY ID
router.get("/cart/:userId", getFromCart);

// REMOVE FROM THE CART
router.delete("/cart/remove-product/:cartProductId",removeFromCart);

// //UPDATE CATEGORY BY ID
// router.patch("/category/:categoryId", updateCategory);
//
// //LIST OF CATEGORY
// router.get("/categories", getAllCategory);

module.exports = router;
