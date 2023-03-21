const SetandGetData =require("../services/servicesSql/SetandGetData.js");
const Products=require("../services/servicesSql/Getproduct");
let product=[],newpro=[],cartitems={};

Products(null,(err,data)=>{
    if(data.length>0 ){
        product=data;
        newpro=data;
    }
})

const getLogin=(req,res)=>{
    if(req.session.islog && req.session.user.username=="admin"){
        res.redirect("/admin");
        return;
    }
    else if(req.session.islog && req.session.user.varified){
           res.redirect("/home");
           return;
    }
    else{
        res.render("login",{error:""});
    }
}

const postLogin=(req,res)=>{
    let {username,password} = req.body;
    let d=[];
    
    if(username=="admin" && password=="123"){
        req.session.islog=true;
        let temp={name:"Admin",username:"admin",email:"admin@gmail.com",password:"123",
            "varified":true,
            "token":Date.now()
        };
        req.session.user=temp;
        res.render("admin",{user:req.session.user,error:"",product:product});
         return; 
    }
    SetandGetData(null,(err, data)=>{
        // console.log(data)
        if(err){
            res.render("login",{error:"something went wrong"});
            return;
        }
        if(data.length>0){
            d=data;
        }
     
        let flag=0;
        for(let i=0;i<d.length;i++){
              if(d[i].username==username && d[i].password==password){
                req.session.islog=true;
                req.session.user=d[i];
                flag=1;
            }
        }
        
        if(flag==0){
            res.render("login",{error:"Username or password is wrong"});
        }
        else{
               res.redirect("/home");
               return; 
        }
        
    })
}

module.exports={getLogin,postLogin};