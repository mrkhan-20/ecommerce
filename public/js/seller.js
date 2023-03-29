let products = [];
const list = document.getElementById("list");
const input = document.querySelectorAll("input");

let request = new XMLHttpRequest();
request.open("GET", "/sellerProducts", true);
request.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        products = JSON.parse(this.responseText);
        load(products);
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
    input[4].value=products.seller;
    input[3].value=products.quantity;
    list.appendChild(clone);
}

function load(products) {
     for (var i = 0; i < products.length; i++) {
         creatingCard(products[i]);
     }
 }


 

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
        let quantity=target.parentNode.firstElementChild.childNodes[3].value;
        let seller=target.parentNode.firstElementChild.childNodes[5].value;
        let req = new XMLHttpRequest();
        req.open("POST","updateProduct");
        req.setRequestHeader("Content-Type", "application/json");
        let p={"name":name,"price":price,"desc":desc,"id":id,"seller":seller,"quantity":quantity};
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
