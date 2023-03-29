const Product=require("./sqlConnection");

    
const checkStock=async (id,quantity,callback)=>{
        try{
            const res=await Product.getClient().query(`select quantity from products where product_id='${id}'`);
            
            if(parseInt(quantity)>parseInt(res.rows[0].quantity)){
                callback(null,res.rows[0].quantity);
            }
            else{
                callback(null,"good");
            }
           
        }catch(err){
            callback(null,false);
            console.log(err)
        }
    }
    
module.exports=checkStock;