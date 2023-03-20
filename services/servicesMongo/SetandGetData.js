const User=require("./mongoconnection");
    
const SetandGetData=async (user,callback)=>{
        try{
            
            if(user){
                const first=new User({
                name: user.name,
                username:user.username,
                email:user.email,
                password:user.password,
                isVarified:user.isVarified,
                token:user.token
            })
                const r=await first.save();
            }
            const res=await User.find().select({_id:0,name:1,username:1,email:1,password:1,isVarified:1,token:1});
           // console.log(res)
            callback(null,res);
        }catch(err){
            callback(err,null);
            console.log(err)
        }
    }
    
module.exports=SetandGetData;


