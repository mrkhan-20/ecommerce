const Cart=require("../services/servicesSql/getCart");
const Products=require("../services/servicesSql/Getproduct");

let product=[],newpro=[],cartitems={};

Products(null,(err,data)=>{
    if(data.length>0 ){
        product=data;
        newpro=data;
    }
    product.splice(0,10)
})

module.exports=(req,res)=>{
    if(req.session.islog){
        Products(null,(err,data)=>{
            if(err) {
                res.render("home2",{user:req.session.user,newpro:newpro,error:"something went wrong",product:"",cartitems:cartitems});
                return;
            }
            newpro=data.splice(10)
            Cart(null,req.session.user.username,(err,data)=>{
                if(data.length>0){
                    res.render("home2",{user:req.session.user,error:"",newpro:newpro,product:product,cartitems:data});
                    return;
                }
                else{
                    res.render("home2",{user:req.session.user,error:"",newpro:newpro,product:product,cartitems:""});
                    return;
                }
                })  
            })
           
        }
        else
            res.redirect("/");
}