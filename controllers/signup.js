const SetandGetData =require("../services/servicesSql/SetandGetData.js");
const sendMail=require("../services/servicesMongo/sendEmail.js");

const getsign=(req,res)=>{
    if(req.session.islog && req.session.user.varified){
        res.redirect("/home");
        return;
    }
   
    res.render("signup",{error:""});
}

const postsign=(req,res)=>{
    let {name,username,email,password,user}=req.body;
    let d=[];
    if(name==null || username==null || email==null || password==null || user==null){
        res.render("signup",{error:"Some fields are empty"});
        return;
    }
    SetandGetData(null,(err, data)=>{
        if(err){
            res.render("signup",{error:"something went wrong"});
            return;
        }
        if(data.length>0 ){
            d=data;
        }
        for(let i=0;i<d.length;i++){
            if(d[i].username==username || d[i].email==email){
                res.render("signup",{error:"user already registered"});
                return;
            }
        }
        if(user=="seller"){
            user=true;
        }
        else{
            user=false;
        }
        let temp={name,username,email,password,user,
        "isVarified":false,
        "token":Date.now()
        };
        
        console.log(temp);
        SetandGetData(temp,(err, data)=>{
            if(err) {
                res.render("signup",{error:"something went wrong"});
                return;
            }
            sendMail(temp.email,temp.token,function(err,data){
                if(err) {
                    res.render("signup",{error:"email cannot send"});
                    return;
                }
                req.session.islog=true;
                req.session.user=temp; 
                res.redirect("/home");
            })
        })
        
    })
}

module.exports={getsign:getsign,postsign:postsign};