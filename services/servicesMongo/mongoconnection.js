const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/test")
.then(()=>{console.log("User db Connection successfull")}).catch((err)=>{console.log(err)});

const userSchema = new mongoose.Schema({
        name: String,
        username:String,
        email:String,
        password:String,
        isVarified:Boolean,
        token:Number
});
       
       
module.exports = mongoose.model('users', userSchema);