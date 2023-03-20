const express=require("express");
const plus=require("../controllers/plus");
const router=express.Router();

router.post('/', plus);

module.exports=router;