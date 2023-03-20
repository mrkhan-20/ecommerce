const User=require("./mongoconnection");
    

const updateUser=async (user,pass,callback)=>{
        try{
            User.updateOne({username:user},{password:pass}).then(function(){
             
            }).catch(function(error){
                console.log(error); 
            });
        }catch(err){
            callback(err,null);
            console.log(err)
        }
    }
    
module.exports=updateUser;


