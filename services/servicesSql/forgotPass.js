const Users=require("./sqlConnection");

const forgotPass=async (email,pass,callback)=>{
        try{
            await Users.getClient().query(`update users set password='${pass}' where email='${email}'`);
        }catch(err){
            callback(err,null);
            console.log(err)
        }
    }
    
module.exports=forgotPass;


