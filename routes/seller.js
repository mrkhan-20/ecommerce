const express=require("express");
const seller=require("../services/servicesSql/getSeller");
const sellerOrders=require("../services/servicesSql/sellerOrders");
const Orders=require("../services/servicesSql/sqlConnection");
const sendDeletemail=require("../services/servicesMongo/sendDeletemail.js");

const router=express.Router();

router.get("/",(req,res)=>{
    if(req.session.islog && req.session.user.varified){
        seller(null,req.session.user.username,(err,data)=>{
            res.render("seller",{user:req.session.user,error:""});
        })
    }
    else{
        res.redirect("/home");
    }

});

router.get("/ordersList",(req,res)=>{
    if(req.session.islog && req.session.user.varified){
        sellerOrders(req.session.user.username,(err,data,data1)=>{
            if(err){
                res.render("ordersList",{user:req.session.user,error:"something went wrong",order:"",product:""});
            }
            res.render("ordersList",{user:req.session.user,error:"",order:data,product:data1});
        })
    }
    else{
        res.redirect("/home");
    }
})
router.post("/deleteBySeller",async (req,res)=>{
    let id=req.body.id;
    if(req.session.user){
        await Orders.getClient().query(`delete from orders where order_id='${id}'`,async (err,response)=>{
            sendDeletemail(req.session.user.email);
        });
        
    }
    return;
})
module.exports=router;
