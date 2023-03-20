const Cart=require("../services/servicesMongo/getCart");
const updateCart=require("../services/servicesMongo/updateCart");

const addtocart=(req,res)=>{
    let id=req.body.id;
    if(req.session.islog && req.session.user.isVarified){
        Cart(null,req.session.user.username,(err,data)=>{
            let username=req.session.user.username;
            if(data.length>0){
                data=data[0];
                if(data.product){
                    if(data.product.get(id)){
                        let q=data.product.get(id).quantity;
                        data.product.set(id,{id:id,quantity:++q})
                    }
                    else{
                        data.product.set(id,{id:id,quantity:1});
                    }
                }
                
                updateCart(data.product,username,(err,data)=>{
                   // console.log(data);
                })
            }else{
                const item={};
                item.username = username;
                item.product={};
                item.product[id]={
                        id:id,
                        quantity:1
                }
                
                Cart(item,username,(err,data)=>{
                    // console.log(data);
                });
            }
        
        })
    }
    else{
        res.redirect("/home")
    }
   
}

module.exports=addtocart;