const express=require("express");
// const admin=require("../controllers/admin");
const seller=require("../services/servicesSql/getSeller");
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

module.exports=router;
