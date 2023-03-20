const getSeller=require("./getSeller");


const items={};
items["taha"]={items:["d934657d82f8af8294eafa7591bd7b10"]}
// console.log(items)
getSeller(items,(err,res)=>{
   //console.log(res[0].users)
//    res[0].users.get("taha").items.push("b34042ebaa049379139376d39ebbad86")
//    console.log(res[0].users)
//    getSeller(res[0].users,(err,res)=>{
//     console.log(res)
//    })
    console.log(res[0].users)
    if(res[0].users.get("amit")==undefined){
        res[0].users[amit]={items:["d934657d82f8af8294eafa7591bd7b10"]}
        getSeller(res[0].users,(err,res)=>{
            console.log(res)
        })
    }
})