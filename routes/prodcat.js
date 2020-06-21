const express = require("express");
const router = express.Router();

const {
  createProductByCategory,
  updateProductByCatgory,
  getProductByCategory
} = require("../controllers/prodcat");

const { requireSignin, adminMiddleware } = require("../controllers/auth");

router.post('/create-prod-by-cat', createProductByCategory);
router.put('/update-prod-by-cat',updateProductByCatgory);
router.get('/get-prod-by-cat', getProductByCategory);

module.exports = router;
