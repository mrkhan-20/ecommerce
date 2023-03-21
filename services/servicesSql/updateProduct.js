const Product=require("./sqlConnection");

    
const updatProduct=async (p)=>{
        try{
            await Product.getClient().query(`update products set name='${p.name}',description='${p.desc}',price='${p.price}',seller='${p.seller}' where product_id='${p.id}'`);
        
        }catch(err){
            console.log(err)
        }
    }
    
module.exports=updatProduct;
