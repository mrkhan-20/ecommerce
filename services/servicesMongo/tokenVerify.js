const User=require("./mongoconnection");
    

const tokenVerify=async (token,check,callback)=>{
        try{
            if(check==null){
                User.updateOne({token:token},{isVarified:true}).then(function(){
                }).catch(function(error){
                    console.log(error); 
                });
            }
            else{
                const res=await User.find({token:token}).select({_id:0,name:1,username:1,email:1,password:1,isVarified:1,token:1});
                callback(null,res);
            }
            
        }catch(err){
            callback(err,null);
            console.log(err)
        }
    }
    
module.exports=tokenVerify;


