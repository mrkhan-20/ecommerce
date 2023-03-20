const express=require("express");
const sign=require("../controllers/signup");

const getsignup=sign.getsign;
const postsignup=sign.postsign;

const router=express.Router();

router.get("/",getsignup);
router.post("/",postsignup);

module.exports=router;