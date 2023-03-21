const Products=require("../services/servicesSql/Getproduct");

let product=[],newpro=[],cartitems={};
Products(null,(err,data)=>{
    if(data.length>0 ){
        product=data;
        newpro=data;
    }
})

const adminproduct=async (req,res)=>{
    req.session.page=1;
    Products(null,(err,data)=>{
        if(data.length>0 ){
            product=data;
            res.json(product);
        }
    })
}
module.exports=adminproduct;