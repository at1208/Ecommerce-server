const express = require("express");
const router = express.Router();

const {
  createOrder,
  paymentVerification,
  allOrdersOfUser,
  allOrders
} = require("../controllers/order");

//CREATE ORDER ROUTE
router.post('/order/create', createOrder);
router.post('/order/verify', paymentVerification)
router.get('/order/all-orders',allOrders)
router.get('/order/user/:user_id', allOrdersOfUser)
module.exports = router;
