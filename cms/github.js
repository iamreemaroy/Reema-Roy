async function publish() {

  let token = prompt("Enter GitHub Token");

  if (!token) return;

  let title = document.getElementById("title").value;
  let price = document.getElementById("price").value;
  let platform = document.getElementById("platform").value;
  let link = document.getElementById("link").value;
  let image = document.getElementById("image").value;
  let category = document.getElementById("category").value;

  let slug = title.toLowerCase().replace(/[^\w ]+/g, "").replace(/ +/g, "-");

  let newDeal = {
    title,
    price,
    platform,
    link,
    image,
    category,
    slug
  };

  let res = await fetch("https://api.github.com/repos/iamreemaroy/Reema-Roy/contents/data/deals.json");

  let file = await res.json();

  let deals = JSON.parse(atob(file.content));

  deals.push(newDeal);

  let updated = btoa(JSON.stringify(deals, null, 2));

  await fetch("https://api.github.com/repos/iamreemaroy/Reema-Roy/contents/data/deals.json", {

    method: "PUT",

    headers: {
      "Authorization": "token " + token,
      "Content-Type": "application/json"
    },

    body: JSON.stringify({
      message: "New deal " + title,
      content: updated,
      sha: file.sha
    })

  });

  alert("Deal published successfully!");

}
