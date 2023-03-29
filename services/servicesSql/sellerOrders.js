const Orders=require("./sqlConnection");

    
const sellerOrders=async (seller,callback)=>{
        try{
            
            const res=await Orders.getClient().query(`Select * from orders where seller_id='${seller}'`);
            const res1=await Orders.getClient().query(`select * from products where product_id in(Select product_id from orders where seller_id='${seller}')`);
            callback(null,res.rows,res1.rows);
        }catch(err){
            callback(err,null,null);
            console.log(err)
        }
    }
    
module.exports=sellerOrders;