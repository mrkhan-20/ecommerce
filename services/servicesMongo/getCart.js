const Cart=require("./cartConnection");
    

const getCart=async (cart,username,callback)=>{
        try{
            
            if(cart){
                const first=new Cart(cart);
                const r=await first.save();
            }
            
            const res=await Cart.find({username:username}).select({_id:0,username:1,product:1});
           // console.log(res)
            callback(null,res);
        }catch(err){
            callback(err,null);
            console.log(err)
        }
    }
    
module.exports=getCart;


