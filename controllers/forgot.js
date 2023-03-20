const sendForgotmail=require("../services/servicesMongo/sendForgotmail");

const getForgot=(req,res)=>{
    res.render("forgot",{error:"",success:""})
}

const postForgot=(req,res)=>{
    let email=req.body.email;
    
    sendForgotmail(email,function(err,data){
        if(err){
            res.render("forgot",{error:"Email could not send",success:""})
        }
        res.render("forgot",{error:"",success:"Email sent successfully"})
    })
}
module.exports={getForgot, postForgot};