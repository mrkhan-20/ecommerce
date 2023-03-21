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
    let {name,username,email,password}=req.body;
    let d=[];
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
        let temp={name,username,email,password,
        "isVarified":false,
        "token":Date.now()
        };
        
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