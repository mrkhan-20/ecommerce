const express=require("express");
const removecart=require("../controllers/removecart");

const router=express.Router();


router.post("/",removecart)
module.exports=router;