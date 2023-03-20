const Seller=require("./sellerConnection");
    

const getSeller=async (user,callback)=>{
    try{
                // const item={};
                // item.username = "taha";
                // item.product={};
                // item.product["c01e853b2910934943bd621f09a707a7"]={"name":"Iphone 14 pro max","description":"This is first product","price":"$15000",};

                // item.product["8fed15d33568a1c9eafa56454fdc24ab"]={"name":"Kawasaki Ninja zr","description":"This is fourth product","price":"$650102",}

                // item.product["b34042ebaa049379139376d39ebbad86"]={"name":"Lamborghini Aventador","description":"this is seventh product","price":"$4000020",}

                // item.product["d934657d82f8af8294eafa7591bd7b10"]={"name":"America","description":"This is tenth product","price":"$500000"}
                // item.users={};
                // item.users["amit"]={items:["d934657d82f8af8294eafa7591bd7b10","b34042ebaa049379139376d39ebbad86"]}
                // item.users["farhan"]={items:["8fed15d33568a1c9eafa56454fdc24ab","c01e853b2910934943bd621f09a707a7"]}
                // const first=new Seller(item);
                // const r=await first.save();
        if(user){
            const res=await Seller.updateOne({username:"mak"},{users:user});
        }
        
        
        const res=await Seller.find().select({_id:0,username:1,product:1,users:1});
    
        callback(null,res);
    }catch(err){
        callback(err,null);
        console.log(err)
    }
}
    
module.exports=getSeller;


