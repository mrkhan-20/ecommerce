const express=require("express");
const dele=require("../controllers/delete");
const router=express.Router();


router.post("/",dele)
module.exports=router;