const Product=require("./productdbConnect");
    
const Getproduct=async (product,callback)=>{
        try{
            
            if(product){
                const first=new Product({
                    name: product.name,
                    description:product.description,
                    price:product.price,
                    file:product.file
                })
                const r=await first.save();
            }
            const res=await Product.find().select({_id:0,name:1,description:1,price:1,file:1,seller:1});
            callback(null,res);
        }catch(err){
            callback(err,null);
            console.log(err)
        }
    }
    
module.exports=Getproduct;


