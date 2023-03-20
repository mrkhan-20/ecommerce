const Cart=require("../services/servicesMongo/getCart");
const Products=require("../services/servicesMongo/Getproduct");

let product=[],newpro=[],cartitems={};

Products(null,(err,data)=>{
    if(data.length>0 ){
        product=data;
        newpro=data;
    }
})

module.exports=(req,res)=>{
    Cart(null,req.session.user.username,(err,data)=>{
        if(data.length>0){
            cartitems=data[0].product;
            res.render("home",{user:req.session.user,error:"",product:product,cartitems:cartitems});
            return;
        }
        else{
            res.render("home",{user:req.session.user,error:"",product:product,cartitems:""});
            return;
        }
    })  
}