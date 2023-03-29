const Cart=require("../services/servicesSql/getCart");
const Products=require("../services/servicesSql/Getproduct");

let product=[],newpro=[];



module.exports=(req,res)=>{
    if(req.session.islog && req.session.user.varified){
        Cart(null,req.session.user.username,(err,data)=>{
            Products(null,(err,d)=>{
                if(d.length>0 ){
                    product=d;
                    newpro=d;
                }
                if(data.length>0){
                    res.render("cart",{user:req.session.user,product:product,newpro:newpro,items:data});
                    return;
                }
                else{
                    res.render("cart",{user:req.session.user,product:product,newpro:newpro,items:""});
                    return;
    
                }
            })
        }) 
        
    }
    else{
        res.redirect("/home");
    }
}
