const Product=require("./sqlConnection");

    
const deleteProduct=async (id)=>{
        try{

            await Product.getClient().query(`delete from products where product_id='${id}'`);
          
        }catch(err){
            console.log(err)
        }
    }
    
module.exports=deleteProduct;
