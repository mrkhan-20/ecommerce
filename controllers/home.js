const Cart=require("../services/servicesSql/getCart");
const Products=require("../services/servicesSql/Getproduct");

let product=[],newpro=[],cartitems={};

Products(null,(err,data)=>{
    if(data.length>0 ){
        product=data;
        newpro=data;
    }
})

module.exports=(req,res)=>{
    Cart(null,req.session.user.username,(err,data)=>{
        // console.log(data);
        if(data.length>0){
            res.render("home",{user:req.session.user,error:"",product:product,cartitems:data});
            return;
        }
        else{
            res.render("home",{user:req.session.user,error:"",product:product,cartitems:""});
            return;
        }
    })  
}