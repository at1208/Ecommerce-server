const Cart =  require('../models/cart');


//CREATE CATEGORY
exports.addIntoCart = (req, res) => {
  const { product, name, count, price, user } = req.body

   const productCart = new Cart({
           product,
           name,
           count,
           user,
           price
   })
   productCart.save((err, result) => {
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

// REMOVE FROM THE CART
exports.removeFromCart = (req, res) => {
  const _id = req.params.cartProductId
   Cart.findOneAndRemove({ _id }).exec((err, data) => {
       if (err) {
           return res.json({
               error: "Failed to remove from cart"
           });
       }
       res.json({
           message: 'successfully removed from the cart'
       });
   });
};
