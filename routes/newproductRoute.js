const express=require("express");
const pro=require("../controllers/newproduct");
const getnewproduct=pro.get;
const postnewproduct=pro.post;
const router=express.Router();
const multer=require("multer");

const upload = multer({ dest: "uploads/" });


router.get("/",getnewproduct)
router.post("/",upload.single("product-pic"),postnewproduct);

module.exports=router;