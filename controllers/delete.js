const Cart=require("../services/servicesMongo/getCart");
const updateCart=require("../services/servicesMongo/updateCart");

module.exports=(req,res)=>{
    let id=req.body.id;

    if(req.session.user){
        Cart(null,req.session.user.username,(err,data)=>{
            let username=req.session.user.username;
                if(data.length>0){
                    data=data[0];
                    if(data.product){
                        data.product.set(id,undefined)
                    }
                }
                updateCart(data.product,username,(err,data)=>{
            
                })
        })
    }
    else{
        res.redirect("/home")
    }
}