const Users=require("./sqlConnection");

Users.connectDb();

async function SetandGetData(users,callback){
    if(users){
        console.log(users)
        const res=await Users.getClient().query(`insert into users values('${users.name}','${users.username}','${users.email}','${users.password}','${users.isVarified}','${users.token}')`);
    }
    const res=await Users.getClient().query(`Select * from users`);
    callback(null,res.rows);
} 

module.exports=SetandGetData;
