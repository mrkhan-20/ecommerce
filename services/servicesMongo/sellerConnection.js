const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/test")
.then(()=>{console.log("Seller db Connection successfull")}).catch((err)=>{console.log(err)});

const sellerSchema = new mongoose.Schema({
    username: {
        type: String,
      },
      product: {
        type: Map,
        of: {
          name:String,
          description:String,
          price:String
        }
      },
      users:{
        type: Map,
        of: {
          items:[String]
        }
      }
});
       
       
module.exports = mongoose.model('Seller', sellerSchema);