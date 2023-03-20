const setdata=require("./SetandGetData");

const users={
    name:'asd',
    username:'asasdd',
    email:'asdas@jasnd',
    password:'12321321',
    isVarified:false,
    token:Date.now()
}
setdata(null,(err,data)=>{
    console.log(data);
})