const express=require("express");
const next=require("../controllers/next");
const router=express.Router();

router.get("/",next)

module.exports=router;