const Products=require("../services/servicesSql/Getproduct");

let product=[],newpro=[],cartitems={};

Products(null,(err,data)=>{
    if(data.length>0 ){
        product=data;
        newpro=data;
    }
})

module.exports=(req,res)=>{
    Products(null,(err,data)=>{
        if(data.length>0 ){
            if(data.length>=req.session.page*5){
                req.session.page++;
               data= data.splice(req.session.page*5-5,5);
            }else{
                data=data.splice(req.session.page*5-5)
            }
            res.json(data);
        }
    })
}