const express=require("express");
const next2=require("../controllers/next2");
const router=express.Router();

router.get("/",next2);

module.exports=router;