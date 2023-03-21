const Carts=require("./sqlConnection");

async function getCart(cart,username,callback){
    try{
        // console.log("insdei")
        if(cart){
            await Carts.getClient().query(`insert into Cart(username,product_id,quantity) values('${cart.username}','${cart.product_id}','${cart.quantity}')`);
        }
        const res=await Carts.getClient().query(`Select * from Cart where username='${username}'`);
        callback(null,res.rows);
    }catch(err){
        callback(err,null);
         console.log(err)
    }
} 

module.exports=getCart;
// let a={
//     username:"taha",
//     product_id:"d934657d82f8af8294eafa7591bd7b10",
//     quantity:1
// };
// getCart(null,"taha",(err,data)=>{
//     console.log(data);
// })