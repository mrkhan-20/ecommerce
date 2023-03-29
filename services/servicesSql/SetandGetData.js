const Users=require("./sqlConnection");

Users.connectDb();

async function SetandGetData(users,callback){
    try{
        if(users){
            await Users.getClient().query(`insert into users(name,username,email,password,varified,token,isseller) values('${users.name}','${users.username}','${users.email}','${users.password}','${users.isVarified}','${users.token}','${users.user}')`);
        }
        const res=await Users.getClient().query(`Select * from users`);
        callback(null,res.rows);
    }catch(err){
        callback(err,null);
         console.log(err)
    }
} 

module.exports=SetandGetData;
