const Cart=require("./cartConnection");
    

const updateCart=async (cart,username,callback)=>{
        try{
            const res=await Cart.updateOne({username:username},{product:cart});
           // console.log(res)
            callback(null,res);
        }catch(err){
            callback(err,null);
            console.log(err)
        }
    }
    
module.exports=updateCart;


