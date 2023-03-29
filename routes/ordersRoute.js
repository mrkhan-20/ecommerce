const express=require("express");
const getAndSetOrder=require("../services/servicesSql/getAndSetOrder");
const Products=require("../services/servicesSql/Getproduct");


const router=express.Router();

router.get("/",(req,res) => {
    if(req.session.user){
        getAndSetOrder(null, req.session.user.username,(err, data) => {
            let order=[];
            Products(null,(err,d)=>{
                data.forEach(element => {
                    d.forEach(e => {
                        if(element.product_id === e.product_id){
                            order.push({element,e});
                        }
                    });
                });
                res.render("order",{order:order,user:req.session.user});    
                return;
            })
            
        })
    }
    else{
        res.redirect("/home")
    }
});
module.exports=router;