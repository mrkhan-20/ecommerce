const seller=require("../services/servicesSql/getSeller");

let product=[],newpro=[],cartitems={};

const get=(req,res)=>{
    if(req.session.islog && req.session.user.varified){
        res.redirect("/seller")
        return;
     }
 
     res.redirect("/home")
}
const post=(req,res)=>{
    if(req.file==null){
        res.render("seller",{user:req.session.user,error:"One or more field is empty"});
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
        res.render("seller",{user:req.session.user,error:"Image should be less than 250kb"});
        return;
    }

    let p=[];
    seller(null,req.session.user.username,(err,data)=>{
        if(err){
            res.render("seller",{user:req.session.user,error:"something went wrong"});
            return;
        }
        if(data.length>0 ){
            p=data;
        }
        seller(pr,req.session.user.username,(err,data)=>{
            if(err) {
                res.render("seller",{user:req.session.user,error:"something went wrong"});
                return;
            }

           
        })
        res.render("seller",{user:req.session.user,error:""});
    })
}

module.exports={get:get,post:post};