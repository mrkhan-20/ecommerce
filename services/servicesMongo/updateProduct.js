const Product=require("./productdbConnect");
    

const updatProduct=async (p)=>{
        try{
            Product.updateOne({file:p.id},{name:p.name,description:p.desc,price:p.price}).then(function(){
             
            }).catch(function(error){
                console.log(error); 
            });
          
        }catch(err){
           
            console.log(err)
        }
    }
    
module.exports=updatProduct;


