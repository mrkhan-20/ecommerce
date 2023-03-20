const express=require("express");
const addtocart=require("../controllers/addtocart");

const router=express.Router();


router.post("/",addtocart);

module.exports=router;