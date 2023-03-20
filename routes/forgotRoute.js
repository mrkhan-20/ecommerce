const express=require("express");
const {getForgot,postForgot}=require("../controllers/forgot");
const router=express.Router();

router.get("/",getForgot)
router.post("/",postForgot)

module.exports=router;
