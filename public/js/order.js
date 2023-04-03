var popup = document.getElementById("p-item");

popup.addEventListener("mouseover", function(e){
    let target=e.target;

    if(target.classList.contains("popup")){
       target.childNodes[1].classList.toggle("show");
    }

})

let items=document.querySelectorAll(".items");
let id,quantity=1;
items.forEach(element=>{
    element.addEventListener("click",(e)=>{
        let target=e.target;
        eid=target.parentNode.parentNode.id;
        if(target.classList.contains("delete")){
            let req = new XMLHttpRequest();
            req.open("POST","delete/deleteOrder");
            req.setRequestHeader("Content-Type", "application/json");
            let id={"id":eid}
            req.send(JSON.stringify(id));
            req.addEventListener("load",()=>{
                target.parentNode.parentNode.remove();

            })
        }
        if(target.classList.contains("deleteOrder")){
            target.parentNode.parentNode.remove();
             sendReq("deleteBySeller",eid);
        }
    })
})


function sendReq(url,uid){
    let req = new XMLHttpRequest();
    req.open("POST",url);
    req.setRequestHeader("Content-Type", "application/json");
    let id={"id":uid}
    req.send(JSON.stringify(id));
    req.addEventListener("load",()=>{
        
    })
}
