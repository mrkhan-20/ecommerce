let start = 0, end = 0;
let products = [];
const list = document.getElementById("list");
const input = document.querySelectorAll("input");
const next = document.getElementById("next");
const prev = document.getElementById("prev");
let request = new XMLHttpRequest();
request.open("GET", "/adminproduct", true);
request.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        products = JSON.parse(this.responseText);
        // console.log(products)
        if (products.length >= 5) {
            load(0, 4,products);
            end = 4;
        } else {
            load(0, products.length - 1,products);
            end = products.length - 1;
        }
    }
}
request.send();

input.forEach(element=>{
    element.addEventListener("click",()=>{
        document.getElementById("error").setAttribute("style","display:none")
    })
})


function creatingCard(products) {
    // console.log(products)
    const temp=document.querySelector('#new');
    const clone = temp.content.cloneNode(true);
    let div=clone.querySelectorAll("div");
    let img=clone.querySelector("img");
    let input=clone.querySelectorAll("input");
    let h5=clone.querySelector("h5");
    let span=clone.querySelector("span");
    let a=clone.querySelector("a");

    div[0].id=products.product_id;
    a.id=products.product_id;
    img.src=products.product_id;
    input[0].value=products.name;
    input[1].value=products.price;
    input[2].value=products.description;
    input[3].value=products.seller;
    list.appendChild(clone);
}
function removeAll() {
    while (list.hasChildNodes()) {
        list.removeChild(list.firstChild);
    }
}
function load(start, end,products) {
   removeAll();
    for (var i = start; i <= end; i++) {
        creatingCard(products[i]);
    }
}
next.addEventListener("click",(event)=>{
    event.preventDefault();
    prev.setAttribute("style","color:rgb(226, 91, 91)");
    let request = new XMLHttpRequest();
    request.open("GET", "/nextProduct", true);
    request.send();
    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            products = JSON.parse(this.responseText);
            if(products.length==0){
                return;
            }
            load(0, products.length-1,products);
        } 
    }
})

prev.addEventListener("click",(event)=>{
    event.preventDefault();
    let request = new XMLHttpRequest();
    request.open("GET", "/prevProducts", true);
    request.send();
    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let p = JSON.parse(this.responseText);
            products=p.data;
            if(p.page==5){
                prev.setAttribute("style","display:none");
            }
            load(0, products.length-1,products);
        }
    }
})
var popup = document.getElementById("p-item");

popup.addEventListener("click", function(e){
    let target=e.target;

    if(target.classList.contains("popup")){
       target.childNodes[1].classList.toggle("show");
    }
})



list.addEventListener("click",(e)=>{
    let target=e.target;

    id=target.parentNode.parentNode.id;

    if(target.classList.contains("delete")){
        target.parentNode.parentNode.remove();
        sendReq("deleteProduct",id);
    }
    if(target.classList.contains("update")){
        let parent=target.parentNode.parentNode.firstElementChild;
        let name=(parent.childNodes[3].firstElementChild.value);
        let price=(parent.childNodes[3].lastElementChild.value);
        let desc=target.parentNode.firstElementChild.childNodes[1].value;
        let seller=target.parentNode.firstElementChild.childNodes[3].value;
        
        let req = new XMLHttpRequest();
        req.open("POST","updateProduct");
        req.setRequestHeader("Content-Type", "application/json");
        let p={"name":name,"price":price,"desc":desc,"id":id,"seller":seller};
        req.send(JSON.stringify(p));
        req.addEventListener("load",()=>{
            
        })
    }
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