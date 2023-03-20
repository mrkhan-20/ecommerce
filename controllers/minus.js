const Cart=require("../services/servicesMongo/getCart");
const updateCart=require("../services/servicesMongo/updateCart");

module.exports=(req,res)=>{
    let id=req.body.id;
    let quantity=req.body.quantity;
    if(req.session.islog && req.session.user.isVarified){
            Cart(null,req.session.user.username,(err,data)=>{
                let username=req.session.user.username;
                if(data.length>0){
                    data=data[0];
                    data.product.set(id,{id:id,quantity:quantity})
                    
                    updateCart(data.product,username,(err,data)=>{
                    // console.log(data);
                    })
            }
        });
    }
    else{
        res.redirect("/home")
    }
}