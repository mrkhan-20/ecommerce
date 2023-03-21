const Users=require("./sqlConnection");
    
const tokenVerify=async (token,check,callback)=>{
        try{
            if(check==null){
                const res=await Users.getClient().query(`update users set Varified=true where token='${token}'`);
            }
            else{
                const res=await Users.getClient().query(`Select * from users where token='${token}'`);
                 callback(null,res.rows);
            }
            
        }catch(err){
            callback(err,null);
            console.log(err)
        }
    }
    
module.exports=tokenVerify;


