const express=require("express");
const getAndSetOrder=require("../services/servicesSql/getAndSetOrder");
const router=express.Router();
const Orders=require("../services/servicesSql/sqlConnection");
const Razorpay = require('razorpay');
var instance = new Razorpay({ key_id: 'rzp_test_EBK6wY0vXIAoeX', key_secret: '3gef0uJYu6twtJcnNt5reVgf' })

let arr=[];

router.post("/",(req,res)=>{
    let d=req.body.uid;
    if(req.session.user){    
        for (let i = 0; i < d.length; i++) {
            getAndSetOrder(d[i], req.session.user.username,arr,(err, data) => {
                if(err){
                    console.log(err);
                    return;
                }
            })
        }
        res.send();
    }
    return;
});
router.post("/checkoutPayment",async (req,res)=>{
    let amount=req.body.sum;
    var options = {
        amount: amount*100, 
        currency: "INR",
        receipt: "order_rcptid_11"
    };
    instance.orders.create(options, function(err, order) {
        if(err){
            console.log(err);
            return;
        }
        res.status(201).json({order})
    });
    return;
})


router.post("/payment",async (req,res)=>{
    let paymentId=req.body.id.payment;
    for (let i = 0; i < arr.length; i++) {
        await Orders.getClient().query(`update orders set payment_id='${paymentId}' where order_id='${arr[i]}'`);
    }  
})

router.post("/delete",async (req,res)=>{
    console.log(arr)
    for (let i = 0; i < arr.length; i++) {
        await Orders.getClient().query(`delete from orders where order_id='${arr[i]}'`);
    }  
})

module.exports=router;

