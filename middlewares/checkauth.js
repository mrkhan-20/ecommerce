function checkauth(req,res,next){
    if(req.session.islog && req.session.user.username=="admin"){
        res.redirect("/admin");
        return;
    }
    if(req.session.islog && req.session.user.varified){
        next();
        return;
    }else if(req.session.islog && !req.session.user.varified){
        res.render("notVarified");
        return;
    }
    else{
        res.redirect("/");
        return;
    }
}
module.exports=checkauth; 