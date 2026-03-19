

window.onload = function(){
  let token = localStorage.getItem("github_token");
  if(token){
  console.log("Already logged in");
  }
}

function logoutGithub(){
  localStorage.removeItem("github_token");
  alert("Logged out successfully");
  location.reload();
}

function loginGithub(){
  let existing = localStorage.getItem("github_token");
  if(existing){
  alert("Already logged in ✅");
  return;
}
  let token = prompt("Enter GitHub Token (one-time setup)");
  if(token){
  localStorage.setItem("github_token", token);
  alert("Login successful 🎉");
  }
}

async function publish(){

let token = localStorage.getItem("github_token");

if(!token){
alert("Please login first");
return;
}

if(!token){
alert("Token required");
return;
}

if(localStorage.getItem("github_token")){
document.querySelector("[onclick='loginGithub()']").style.display="none";
}  

let title=document.getElementById("title").value.trim();

let rawPrice=document.getElementById("price").value;
let price=parseInt(rawPrice.replace(/[^0-9]/g,'')) || 0;

// ❌ BLOCK publish if price missing
if(!rawPrice || price === 0){
alert("⚠️ Price is required to publish deal");
return;
}

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

try {
  deals = file.content ? JSON.parse(atob(file.content)) : [];
} catch (e) {
  deals = [];
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
