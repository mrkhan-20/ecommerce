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
       
        id=target.parentNode.parentNode.id;
        if(target.classList.contains("cart")){
            target.setAttribute("style", "display:none");
            target.nextElementSibling.setAttribute("style", "");
            sendReq("addtocart",id);
        }
        if(target.classList.contains("removecart")){
            target.setAttribute("style", "display:none");
            target.previousElementSibling.setAttribute("style", "");
            sendReq("removecart",id);
        }
        if(target.classList.contains("delete")){
            target.parentNode.parentNode.remove();
            sendReq("delete",id);
        }
        if(target.classList.contains("plus")){
            id=target.parentNode.parentNode.parentNode.id;
            quantity=target.previousElementSibling.innerText;
            quantity++;
            if(quantity<=5){
                target.previousElementSibling.innerText=quantity;
                send("plus",id,quantity);
            }
            else{
                console.log("not 5");
                send("plus",id,5);
            }
           
        }
        if(target.classList.contains("minus")){
            id=target.parentNode.parentNode.parentNode.id;
            target=target.previousElementSibling;
            quantity=target.previousElementSibling.innerText;
            if(quantity>1){
                quantity--;
                target.previousElementSibling.innerText=quantity;
                send("minus",id,quantity);
            }
        }
    })
})

function send(url,uid,quantity){
    let req = new XMLHttpRequest();
    req.open("POST",url);
    req.setRequestHeader("Content-Type", "application/json");
    let id={"id":uid,"quantity":quantity}
    req.send(JSON.stringify(id));
    req.addEventListener("load",()=>{
        
    })
}

function sendReq(url,uid){
    let req = new XMLHttpRequest();
    req.open("POST",url);
    req.setRequestHeader("Content-Type", "application/json");
    let id={"id":uid}
    req.send(JSON.stringify(id));
    req.addEventListener("load",()=>{
        
    })
}
let checkout=document.getElementById("checkout");

checkout.addEventListener("click",(e)=>{
    let uid=[];
    items.forEach(e=>{
        uid.push({id:e.id,seller:e.getAttribute("seller")})
    })
    let req = new XMLHttpRequest();
    req.open("POST","checkout");
    req.setRequestHeader("Content-Type", "application/json");
    let id={id:uid}
    req.send(JSON.stringify(id))
    req.addEventListener("load",()=>{
        
    })
})
