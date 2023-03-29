const express=require("express");
const checkAuth=require("../middlewares/checkauth");
const home=require("../controllers/home");
const router=express.Router();

router.get("/",checkAuth,home);


module.exports=router;