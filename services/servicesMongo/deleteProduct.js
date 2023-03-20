const Product=require("./productdbConnect");
    

const deleteProduct=async (id)=>{
        try{

            Product.deleteOne({file:id}).then(function(){
             
            }).catch(function(error){
                console.log(error); 
            });
          
        }catch(err){
           
            console.log(err)
        }
    }
    
module.exports=deleteProduct;


