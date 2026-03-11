async function fetchProduct(){

let url=document.getElementById("link").value;

let api="https://api.microlink.io/?url="+encodeURIComponent(url);

let res=await fetch(api);
let data=await res.json();

if(data.status==="success"){

document.getElementById("title").value=data.data.title || "";

document.getElementById("description").value=data.data.description || "";

document.getElementById("image").value=data.data.image.url || "";

if(url.includes("amazon")){

document.getElementById("platform").value="Amazon";

}

if(url.includes("myntra")){

document.getElementById("platform").value="Myntra";

}

}

}
