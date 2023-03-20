const express=require("express");;
const prev=require("../controllers/prevProduct");

const router=express.Router();

router.get("/",prev);
module.exports=router;