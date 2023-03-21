const Products=require("../services/servicesSql/Getproduct");

let product=[],newpro=[],cartitems={};

Products(null,(err,data)=>{
    if(data.length>0 ){
        product=data;
        newpro=data;
    }
})

const admin= (req,res)=>{
    // console.log(req.session.islog , req.session.user.varified, req.session.user.username)
    if(req.session.islog && req.session.user.varified && req.session.user.username=="admin"){
        Products(null,(err,data)=>{
            if(data.length>0 ){
                product=data;
    
            }
        })
        res.render("admin",{user:req.session.user,error:"",product:product});
        return;
    }
    else{
        res.render("notAdmin")
    }
    
}
module.exports=admin;