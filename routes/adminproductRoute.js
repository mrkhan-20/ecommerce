const express=require("express");
const adminproduct=require("../controllers/adminproduct");
const router=express.Router();


router.get("/",adminproduct);
module.exports=router;