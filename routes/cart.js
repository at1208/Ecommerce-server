const express = require("express");
const router = express.Router();

const {
addIntoCart,
removeFromCart,
getFromCart,
addProductCountCart,
subtractProductCountCart
} = require("../controllers/cart");

const { requireSignin } = require("../controllers/auth");


//ADD PRODUCT INTO CART
router.post("/cart/add-product", addIntoCart);

// // PRODUCT BY ID
router.get("/cart/:userId", getFromCart);

// REMOVE FROM THE CART
router.delete("/cart/remove-product/:cartProductId",removeFromCart);

// INCREMENT IN CART COUNT
router.patch("/cart/increment/:cartProductId/:productId", addProductCountCart);

// DECREMENT IN CART COUNT
router.patch("/cart/decrement/:cartProductId/:productId", subtractProductCountCart);



module.exports = router;
