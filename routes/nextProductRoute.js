const express=require("express");;
const nextProduct=require("../controllers/nextProduct");
const router=express.Router();

router.get("/",nextProduct);

module.exports=router;
