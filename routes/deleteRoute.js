const express=require("express");
const dele=require("../controllers/delete");
const Orders=require("../services/servicesSql/sqlConnection");
const router=express.Router();


router.post("/",dele);
router.post("/deleteOrder",async (req,res)=>{
    let id=req.body.id;
    if(req.session.user){
        await Orders.getClient().query(`delete from orders where user_id='${req.session.user.username}' and order_id='${id}'`);
        
        res.send();
    }
    return;
})

module.exports=router;