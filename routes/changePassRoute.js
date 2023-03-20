const express=require("express");
const {getChangePass,postChangePass}=require("../controllers/changePass");
const router=express.Router();


router.get("/",getChangePass);
router.post("/",postChangePass);

module.exports=router;
