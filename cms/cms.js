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
function preview(){
let title=document.getElementById("title").value;
let price=document.getElementById("price").value;
let image=document.getElementById("image").value;
let desc=document.getElementById("description").value;
let link=document.getElementById("link").value;
document.getElementById("preview").innerHTML=`
<div style="border:1px solid #ddd;padding:20px;margin-top:20px">
<img src="${image}" style="width:200px">
<h2>${title}</h2>
<p><b>${price}</b></p>
<p>${desc}</p>
<a href="${link}" target="_blank">View Deal</a>
</div>
`;
}
