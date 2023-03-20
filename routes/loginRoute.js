const express=require("express");
const {getLogin,postLogin}=require("../controllers/login");
const router=express.Router();

router.get("/",getLogin)
router.post("/",postLogin)
module.exports=router;