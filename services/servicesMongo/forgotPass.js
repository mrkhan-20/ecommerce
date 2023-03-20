const User=require("./mongoconnection");
    

const forgotPass=async (email,pass,callback)=>{
        try{
            User.updateOne({email:email},{password:pass}).then(function(){
             
            }).catch(function(error){
                console.log(error); 
            });
        }catch(err){
            callback(err,null);
            console.log(err)
        }
    }
    
module.exports=forgotPass;


