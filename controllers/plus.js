const Cart=require("../services/servicesSql/getCart");
const updateCart=require("../services/servicesSql/updateCart");

module.exports=(req,res)=>{
    let id=req.body.id;
    let quantity=req.body.quantity;
    if(req.session.islog && req.session.user.varified){
        Cart(null,req.session.user.username,(err,data)=>{
            let username=req.session.user.username;
            if(data.length>0){
                let p={"quantity":quantity};
                updateCart(p,1,username,id);
            }
            res.send();
    });
    }
    else{
        res.redirect("/home")
    }
}