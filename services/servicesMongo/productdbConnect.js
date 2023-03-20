const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/test")
.then(()=>{console.log("Product db Connection successfull")}).catch((err)=>{console.log(err)});

const productSchema = new mongoose.Schema({
        name: String,
        description:String,
        price:String,
        file:String,
        seller:String
});
       
       
module.exports = mongoose.model('Product', productSchema);