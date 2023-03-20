const express=require("express");
const mycart=require("../controllers/mycart");
const router=express.Router();

router.get("/",mycart);

module.exports=router;