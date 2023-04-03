const Carts=require("../services/servicesSql/sqlConnection");

module.exports=async (req,res)=>{
    let id=req.body.id;
    console.log(req.body)
    let username=req.session.user.username;
    await Carts.getClient().query(`delete from Cart where username='${username}' and product_id='${id}'`);
    res.redirect("/home")
}