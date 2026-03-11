function fetchProduct(){
  let url=document.getElementById("link").value;
  fetch("https://api.allorigins.win/get?url="+encodeURIComponent(url))
  .then(res=>res.json())
  .then(data=>{
  let html=data.contents;
  let title=html.match(/<title>(.*?)<\/title>/i);
    
  if(title){
  document.getElementById("title").value=title[1];
}
});
}

function preview(){
  let title=document.getElementById("title").value;
  let price=document.getElementById("price").value;
  let image=document.getElementById("image").value;
  let desc=document.getElementById("description").value;

  document.getElementById("preview").innerHTML=`

<h2>${title}</h2>
<img src="${image}" width="200">
<p>${price}</p>
<p>${desc}</p>

`;

}
