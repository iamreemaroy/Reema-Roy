async function publish(){

let token = prompt("Enter GitHub Token");

if(!token){
alert("Token required");
return;
}

let title=document.getElementById("title").value;
let price=document.getElementById("price").value;
let platform=document.getElementById("platform").value;
let link=document.getElementById("link").value;
let image=document.getElementById("image").value;
let category=document.getElementById("category").value;

if(!title){
alert("Title missing");
return;
}

let newDeal={
title:title,
price:price,
platform:platform,
link:link,
image:image,
category:category
};

let repo="iamreemaroy/Reema-Roy";

let response = await fetch(
`https://api.github.com/repos/${repo}/contents/data/deals.json`
);

let file = await response.json();

let deals = [];

if(file.content){

deals = JSON.parse(atob(file.content));

}

deals.push(newDeal);

let updated=btoa(JSON.stringify(deals,null,2));

await fetch(
`https://api.github.com/repos/${repo}/contents/data/deals.json`,
{

method:"PUT",

headers:{
"Authorization":"token "+token,
"Content-Type":"application/json"
},

body:JSON.stringify({
message:"New deal: "+title,
content:updated,
sha:file.sha
})

});

alert("Deal published successfully");

location.reload();

}
