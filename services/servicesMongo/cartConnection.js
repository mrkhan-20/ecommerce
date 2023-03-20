const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/test")
.then(()=>{console.log("Cart db Connection successfull")}).catch((err)=>{console.log(err)});

const cartSchema = new mongoose.Schema({
    username: {
        type: String,
      },
      product: {
        type: Map,
        of: {
          id: {
            type: String,
          },
          quantity: {
            type: Number,
          }
        }
      }
});
       
       
module.exports = mongoose.model('Cart', cartSchema);