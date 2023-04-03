const Cart=require("../services/servicesSql/getCart");
const Products=require("../services/servicesSql/Getproduct");


module.exports=(req,res)=>{
    if(req.session.user.isseller){
        res.redirect("/seller")
    }
    Products(null,(err,d)=>{
        Cart(null,req.session.user.username,(err,data)=>{
            // console.log(data);
            if(data.length>0){
                res.render("home",{user:req.session.user,error:"",product:d,cartitems:data});
                return;
            }
            else{
                res.render("home",{user:req.session.user,error:"",product:d,cartitems:""});
                return;
            }
        })  
    })
}