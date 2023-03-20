const express=require("express");
const minus=require("../controllers/minus");
const router=express.Router();

router.post('/', minus);

module.exports=router;