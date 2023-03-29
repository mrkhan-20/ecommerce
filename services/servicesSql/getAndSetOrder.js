const Orders=require("./sqlConnection");

     
const getAndSetOrder=async (product,user,callback)=>{
        try{
            if(product){
                await Orders.getClient().query('BEGIN');
        
                await Orders.getClient().query(`update products set quantity=quantity-'${product.quantity}' where product_id='${product.id}'`);
                
                await Orders.getClient().query(`insert into orders(user_id,seller_id,product_id,quantity,address,city,pincode)
                values('${user}','${product.seller}','${product.id}','${product.quantity}','23 A/4k','alld',211016)`);

            }
            const res=await Orders.getClient().query(`Select * from orders where user_id='${user}'`);
            await Orders.getClient().query('COMMIT');
            callback(null,res.rows);
        }catch(err){
             await Orders.getClient().query('ROLLBACK');
            callback(err,null);
            console.log(err)
        }
    }
    
module.exports=getAndSetOrder;


