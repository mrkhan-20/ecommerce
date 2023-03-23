const express=require("express");
const session = require("express-session");
const Products=require("./services/servicesSql/Getproduct");
const updateProduct=require("./services/servicesSql/updateProduct");
const deleteProduct=require("./services/servicesSql/deleteProduct");
const Cart=require("./services/servicesMongo/getCart");
const forgotPass=require("./services/servicesSql/forgotPass");
const tokenVerify=require("./services/servicesSql/tokenVerify");
const getSeller=require("./services/servicesSql/getSeller");


////Routes
const login=require("./routes/loginRoute");
const signup=require("./routes/signupRoute");
const home=require("./routes/homeRoute");
const admin=require("./routes/adminRoute");
const seller=require("./routes/seller");
const adminproduct=require("./routes/adminproductRoute");
const nextProduct=require("./routes/nextProductRoute");
const prevProducts=require("./routes/prevProductRoute");
const newproduct=require("./routes/newproductRoute");
const sellerNewProduct=require("./routes/sellerNewProduct");
const changePass=require("./routes/changePassRoute");
const forgot=require("./routes/forgotRoute");
const mycart=require("./routes/mycartRoute");
const addtocart=require("./routes/addtocartRoute");
const plus=require("./routes/plusRoute");
const minus=require("./routes/minusRoute");
const del=require("./routes/deleteRoute");
const removecart=require("./routes/removecartRoute");
const next=require("./routes/nextRoute");
const next2=require("./routes/next2Route");

///
const app=express();


app.use(express.static("public"));
app.set('view engine','ejs');
app.use(express.static("uploads"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(session({
    secret:"keyboard cat",
    resave:false,
    saveUninitialized:true
}))

let product=[],newpro=[],cartitems={};

Products(null,(err,data)=>{
    if(data.length>0 ){
        product=data;
        newpro=data;
    }
})

app.get("/",(req,res)=>{
    res.render("root");
})

app.use("/home",home);

app.use("/admin",admin);

app.use("/login",login);

app.use("/signup",signup);

app.get("/verifyMail/:token", function(req, res){
    const {token}=req.params;
   
    tokenVerify(token,null,()=>{});
    tokenVerify(token,1,(err,re)=>{
        req.session.user=re[0];
        req.session.islog=true;
        Cart(null,req.session.user.username,(err,data)=>{
                cartitems={};
                res.redirect("/home")
                return;
        });
    });

})
app.use("/seller",seller);
app.get("/sellerProducts",(req,res)=>{
    getSeller(null,req.session.user.username,(err,data)=>{
        res.json(data);
    });
})

app.use("/adminproduct",adminproduct);

app.use("/nextProduct",nextProduct);

app.use("/prevProducts",prevProducts);


app.post("/checkout",(req,res)=>{
    let data=req.body.id;
    data.forEach(element => {

        getSeller()
    });
})

app.use("/newproduct",newproduct);
app.use("/sellerNewProduct",sellerNewProduct);

app.post("/updateProduct",(req,res)=>{
    let product=req.body;
    updateProduct(product);
})

app.use("/changePass",changePass);

let em;
app.route("/resetPass/:email").get((req,res)=>{
     em=req.params;
    res.render("resetPass",{error:"",success:""})
}).post((req,res)=>{
    
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
            forgotPass(em.email,newpassword);
            res.render("resetPass",{error:"",success:"Password Change Successfully"});
          }
       
    }
    else{
        res.render("resetPass",{error:"Password does not match",success:""});
    }
});

app.use("/forgot",forgot);

app.use("/mycart",mycart);

app.use("/addtocart",addtocart)

app.use("/plus",plus);
app.use("/minus",minus)

app.post("/deleteProduct",(req,res)=>{
    let id=req.body.id;
    deleteProduct(id);
})

app.use("/delete",del);

app.use("/removecart",removecart);

app.use("/next",next);
app.use("/next2",next2);

app.get("/logout",(req,res)=>{
    req.session.destroy();
    res.redirect("/");
})

app.listen(3000,()=>{
    console.log("Server started");
})