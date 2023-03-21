const updateUser=require("../services/servicesSql/updateUser");

const getChangePass=(req,res)=>{
    if(req.session.islog && req.session.user.varified){
        res.render("changePass",{error:"",success:""});
       
        return;
    }
    else{
        res.redirect("/home");
    }
}

const postChangePass=(req,res)=>{
    let {newpassword, password}=req.body;
   
    if(newpassword===password){
        if (password.length < 8) {
            res.render("changePass",{error:"Your password needs a minimum of Eight characters",success:""});
          } else if (password.search(/[a-z]/) < 0) {
            res.render("changePass",{error:"Your password needs an lower case letter",success:""});
          } else if(password.search(/[A-Z]/) < 0) {
            res.render("changePass",{error:"Your password needs an upper case letter",success:""});
          } else  if (password.search(/[0-9]/) < 0) {
            res.render("changePass",{error:"Your password needs a number",success:""});
          } else {
              updateUser(req.session.user.username,newpassword)
              res.render("changePass",{error:"",success:"Password Change Successfully"});
          }
    }
    else{
        res.render("changePass",{error:"Password does not match",success:""});
    }
}

module.exports={getChangePass,postChangePass}