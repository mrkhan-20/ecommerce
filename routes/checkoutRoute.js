const express=require("express");
const getAndSetOrder=require("../services/servicesSql/getAndSetOrder");
const router=express.Router();
const Razorpay = require('razorpay');
var instance = new Razorpay({ key_id: 'rzp_test_EBK6wY0vXIAoeX', key_secret: '3gef0uJYu6twtJcnNt5reVgf' })


router.post("/",(req,res)=>{
    let d=req.body.uid;
    let amount=req.body.sum;
    if(req.session.user){
        var options = {
            amount: amount, 
            currency: "USD",
            receipt: "order_rcptid_11"
        };
        
        for (let i = 0; i < d.length; i++) {
            getAndSetOrder(d[i], req.session.user.username,(err, data) => {
                if(err){
                    console.log(err);
                    return;
                }
                if(i==d.length-1){
                    instance.orders.create(options, function(err, order) {
                        if(err){
                            console.log(err);
                            return;
                        }
                        res.status(201).json({order})
                    });
                }
            })
        }
        
    }
    return;
});

module.exports=router;

