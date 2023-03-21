const Users=require("./sqlConnection");

const updateUser=async (user,pass,callback)=>{
        try{
            await Users.getClient().query(`update users set password='${pass}' where username='${user}'`);
        }catch(err){
            callback(err,null);
            console.log(err)
        }
    }
    
module.exports=updateUser;


