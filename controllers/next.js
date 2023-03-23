const Cart=require("../services/servicesSql/getCart");
const Products=require("../services/servicesSql/Getproduct");

let product=[],newpro=[],cartitems={};



module.exports=(req,res)=>{
    if(req.session.islog){
        Products(null,(err,data)=>{
            newpro=data.splice(5,5);
            if(err) {
                res.render("home1",{user:req.session.user,newpro:newpro,error:"something went wrong",product:"",cartitems:cartitems});
                return;
            }
            Cart(null,req.session.user.username,(err,data)=>{
                if(data.length>0){
            
                    res.render("home1",{user:req.session.user,error:"",newpro:newpro,product:product,cartitems:data});
                    return;
                }
                else{
                    res.render("home1",{user:req.session.user,error:"",newpro:newpro,product:product,cartitems:""});
                    return;
                }
            })  
        })
    }else
      res.redirect("/");
}