
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
            let q=target.parentNode.parentNode.parentNode.getAttribute("quantity");
            if(quantity<=q){
                let req = new XMLHttpRequest(); 
                req.open("POST","plus");
                req.setRequestHeader("Content-Type", "application/json");
                let uid={"id":id,"quantity":quantity}
                req.send(JSON.stringify(uid));
                req.addEventListener("load",()=>{
                    target.previousElementSibling.innerText=quantity;
                })
            }
            else{
                alert("Cannot go above stock");
                send("plus",id,quantity-1);
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
let sum=0,flag=false,uid=[],itemtodelete=[];
checkout.addEventListener("click",()=>{
    items.forEach(e=>{
        let q=e.lastElementChild.childNodes[3].firstElementChild.innerText;
        if(e.lastElementChild.lastElementChild.checked){
            let req = new XMLHttpRequest();
            req.open("POST","checkStock");
            req.setRequestHeader("Content-Type", "application/json");
            req.send(JSON.stringify({id:e.id,quantity:q}));
            req.addEventListener("load",()=>{ 
                if(req.status==200){
                    flag=true;
                    let price=e.firstElementChild.lastElementChild.lastElementChild.innerHTML;
                    price=price.split("$")[1];
                    let qua=e.firstElementChild.firstElementChild.src.split("http://localhost:3000/")[1];
                    let quan=document.getElementById(qua+"quan").innerText;
                    sum+=parseInt(price)*parseInt(quan);
                    itemtodelete.push(e)
                    uid.push({id:e.id,seller:e.getAttribute("seller"),quantity:q});
                } 
                else{
                    let stock=e.lastElementChild.childNodes[7];
                    console.log(stock)
                    stock.innerText ="Stock left:"+req.responseText;
                    stock.setAttribute("style","color:red");
                }
            })
        }
    })
    setTimeout(()=>{
        if(flag==1){
            console.log(sum)
            let req = new XMLHttpRequest();
            req.open("POST","checkout");
            req.setRequestHeader("Content-Type", "application/json");
            req.send(JSON.stringify({uid,sum}))
            req.addEventListener("load",()=>{
                console.log(req.responseText);
                var options = {
                    "key": "rzp_test_EBK6wY0vXIAoeX",
                    "amount": sum,
                    "currency": "USD",
                    "name": "My Ecommerce",
                    "description": "Test Transaction",
                    "order_id": req.responseText.id, 
                    "handler": function (response){
                        alert("Payment Successful");
                        itemtodelete.forEach(e=>{
                            e.remove();
                            sendReq("removecart",e.id);
                        })
                    },
                    "theme": {
                        "color": "#3399cc"
                    }
                };
                var rzp1 = new Razorpay(options);
                rzp1.on('payment.failed', function (response){
                        alert(response.error.description);
                        alert(response.error.source);
                        alert(response.error.reason);
                });
                rzp1.open();
                
            })
        }
    },1000)


}) 
