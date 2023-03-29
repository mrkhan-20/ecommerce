const Carts=require("./sqlConnection");

async function updateCart(cart,flag,username,id){
    try{
        if(flag){
            await Carts.getClient().query(`update cart set quantity='${cart.quantity}' where username='${username}' and product_id='${id}'`);
        }
        else{
            await Carts.getClient().query(`insert into Cart(username,product_id,quantity) values('${cart.username}','${cart.product_id}','${cart.quantity}')`);
        }
    }catch(err){
         console.log(err)
    }
} 

module.exports=updateCart;


