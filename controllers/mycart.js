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
    if(req.session.islog && req.session.user.varified){
        Cart(null,req.session.user.username,(err,data)=>{
            if(data.length>0){
                cartitems=data;
            }
           /// console.log(product)
            if(cartitems){
                res.render("cart",{user:req.session.user,product:product,newpro:newpro,items:cartitems});
                return;
            }
            else{
                res.render("cart",{user:req.session.user,product:product,newpro:newpro,items:""});
                return;

            }
        }) 
        
    }
    else{
        res.redirect("/home");
    }
}
