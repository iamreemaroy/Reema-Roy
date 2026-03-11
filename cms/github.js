async function publish(){
let token=prompt("Enter GitHub Token");
let title=document.getElementById("title").value;
let price=document.getElementById("price").value;
let platform=document.getElementById("platform").value;
let link=document.getElementById("link").value;
let desc=document.getElementById("description").value;
let image=document.getElementById("image").value;
let category=document.getElementById("category").value;
let slug=title.toLowerCase().replace(/[^\w ]+/g,"").replace(/ +/g,"-");

let content=`---
title: "${title}"
price: "${price}"
platform: "${platform}"
link: "${link}"
image: "${image}"
category: "${category}"
---

${desc}
`;
let path=`deals/${category}/${slug}.md`;
await fetch("https://api.github.com/repos/iamreemaroy/Reema-Roy/contents/"+path,{
method:"PUT",
headers:{
"Authorization":"token "+token,
"Content-Type":"application/json"
},
body:JSON.stringify({
message:"New deal: "+title,
content:btoa(content)
})
});
alert("Deal Published!");
}
