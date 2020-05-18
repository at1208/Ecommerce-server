const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const cartSchema = new mongoose.Schema({
  product: {
    type: ObjectId,
    ref: "Product"
  },
  user: {
    type: ObjectId,
    required:true,
    ref: "User"
  },
  name: String,
  count: Number,
  price: Number
});

module.exports = mongoose.model("Cart", cartSchema);
