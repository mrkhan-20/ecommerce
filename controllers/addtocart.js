const Cart=require("../services/servicesSql/getCart");
const updateCart=require("../services/servicesSql/updateCart");

const addtocart=(req,res)=>{
    let id=req.body.id;
    if(req.session.islog && req.session.user.varified){
        Cart(null,req.session.user.username,(err,data)=>{
            // console.log(data,"!");
            let username=req.session.user.username;
            if(data && data.length>0){
                let flag=0;
                let updated;
                for(let i=0;i<data.length;i++) {
                    if(data[i].product_id==id){
                        data[i].quantity++;
                        updated=data[i];
                        flag=1;
                        break;
                    }
                }
                if(flag==1){
                    updateCart(updated,flag,username,id);
                }
                else{
                    updated={
                        username:username,
                        product_id:id,
                        quantity:1
                    }
                    updateCart(updated,flag,username,id);
                }
                
            }else{
                const item={};
                item.username = username;
                item.product_id=id;
                item.quantity=1;
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