const Products=require("../services/servicesSql/Getproduct");

let product=[],newpro=[],cartitems={};

Products(null,(err,data)=>{
    if(data.length>0 ){
        product=data;
        newpro=data;
    }
})

const get=(req,res)=>{
    if(req.session.islog && req.session.user.varified){
        res.redirect("/admin")
        return;
     }
 
     res.redirect("/home")
}
const post=(req,res)=>{
    if(req.file==null){
        res.render("admin",{user:req.session.user,error:"One or more field is empty",product:product,cartitems:cartitems});
        return;
    }
    let pr={
        "name": req.body.name,
        "description": req.body.description,
        "price":req.body.price,
        "file":req.file.filename,
        "seller":req.body.seller
    }
    if(req.file.size>250000){
        res.render("admin",{user:req.session.user,error:"Image should be less than 250kb",product:product,cartitems:cartitems});
        return;
    }

    let p=[];
    Products(null,(err,data)=>{
        if(err){
            res.render("admin",{user:req.session.user,error:"something went wrong",product:"",cartitems:cartitems});
            return;
        }
        if(data.length>0 ){
            p=data;
        }
        Products(pr,(err,data)=>{
            if(err) {
                res.render("admin",{user:req.session.user,error:"something went wrong",product:""});
                return;
            }

           
        })
        res.render("admin",{user:req.session.user,error:"",product:p});
    })
}

module.exports={get:get,post:post};