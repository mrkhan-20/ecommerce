const Products=require("../services/servicesSql/Getproduct");
let product=[],newpro=[],cartitems={};

Products(null,(err,data)=>{
    if(data.length>0 ){
        product=data;
        newpro=data;
    }
})

module.exports=(req,res)=>{
    let page=req.session.page;
    
    if(page>1){
       req.session.page--;
       page--;
    }
    page=page*5;
    Products(null,(err,data)=>{
        if(data.length>0 ){
            data=data.splice(page-5,5);
            res.json({data,page});
        }
    })
}