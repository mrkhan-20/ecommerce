const Product=require("./sqlConnection");

    
const deleteProduct=async (id)=>{
        try{

            await Product.getClient().query(`update products set isavailable=false where product_id='${id}'`);
          
        }catch(err){
            console.log(err)
        }
    }
    
module.exports=deleteProduct;
