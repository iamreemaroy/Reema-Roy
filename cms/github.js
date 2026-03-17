function loginGithub(){
  let token=prompt("Enter GitHub Token (only once)");
  if(token){
  localStorage.setItem("github_token",token);
  alert("Logged in successfully!");
  }
}

function logoutGithub(){
  localStorage.removeItem("github_token");
  alert("Logged out!");
}

async function publish(){

let token = prompt("Enter GitHub Token");

if(!token){
alert("Token required");
return;
}

let title=document.getElementById("title").value.trim();

let rawPrice=document.getElementById("price").value;
let price=parseInt(rawPrice.replace(/[^0-9]/g,'')) || 0;

let platform=document.getElementById("platform").value.trim();
let link=document.getElementById("link").value.trim();

let image=document.getElementById("image").value || "";

// Fix Amazon image quality
if(image.includes("amazon")){
image=image.replace(/_SL\d+_/,"_SL2000_");
}

let category=document.getElementById("category").value.toLowerCase().trim();

let repo="iamreemaroy/Reema-Roy";

let newDeal={
title,
price,
platform,
link,
image,
category
};

let res=await fetch(
`https://api.github.com/repos/${repo}/contents/data/deals.json`,
{
headers:{
Authorization:"token "+token,
Accept:"application/vnd.github+json"
}
}
);

let file=await res.json();

let deals=[];

if(file.content){
deals=JSON.parse(atob(file.content));
}

deals.push(newDeal);

let updated=btoa(JSON.stringify(deals,null,2));

await fetch(
`https://api.github.com/repos/${repo}/contents/data/deals.json`,
{
method:"PUT",

headers:{
Authorization:"token "+token,
Accept:"application/vnd.github+json",
"Content-Type":"application/json"
},

body:JSON.stringify({
message:"New deal "+title,
content:updated,
sha:file.sha
})

});

alert("Deal published successfully!");
location.reload();
}
