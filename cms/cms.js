const allowedUser = "iamreemaroy";
async function checkUser() {
  let token = localStorage.getItem("github_token");
  if (!token) {
    document.body.innerHTML = `
      <div style="text-align:center;margin-top:100px;">
        <h2>Login Required</h2>
        <button onclick="loginGithub()" style="padding:10px 20px;background:black;color:white;border:none;border-radius:6px;">
          Login with GitHub
        </button>
      </div>
    `;
    return;
  }
  try {
    let res = await fetch("https://api.github.com/user", {
      headers: { Authorization: "token " + token }
    });
    let data = await res.json();
    if (data.login !== allowedUser) {
      document.body.innerHTML = `
        <div style="text-align:center;margin-top:100px;">
          <h2>Access Denied</h2>
          <button onclick="logoutGithub()">Logout</button>
        </div>
      `;
    }
  } catch (e) {
    localStorage.removeItem("github_token");
    location.reload();
  }
}
checkUser();

async function fetchProduct() {
  let url = document.getElementById("link").value;
  if (!url) {
    alert("Paste affiliate link first");
    return;
  }
  try {
    let api = "https://api.microlink.io/?url=" + encodeURIComponent(url);
    let response = await fetch(api);
    let data = await response.json();
    if (data.status === "success") {
      document.getElementById("title").value = data.data.title || "";
      document.getElementById("description").value = data.data.description || "";
      let image = data.data.image?.url || "";
      // 🔥 Fix blur image
      if (image.includes("amazon")) {
        image = image.replace(/_SL\d+_/,"_SL2000_");
      }
      // fallback
      if (!image) {
        image = "/assets/img/no-image.png";
      }
      document.getElementById("image").value = image;
      if (url.includes("amazon")) {
        document.getElementById("platform").value = "Amazon";
      }
      if (url.includes("myntra")) {
        document.getElementById("platform").value = "Myntra";
      }
    }
  } catch (e) {
    alert("Unable to fetch product automatically. Fill details manually.");
  }
}

function preview() {

  let title = document.getElementById("title").value;
  let price = document.getElementById("price").value;
  let image = document.getElementById("image").value;
  let link = document.getElementById("link").value;
  let platform = document.getElementById("platform").value;

  let html = `
  <div style="border:1px solid #ddd;padding:20px;margin-top:20px;max-width:300px">

    <img src="${image}" style="width:100%">

    <h3>${title}</h3>

    <p><b>${price}</b></p>

    <p>${platform}</p>

    <a href="${link}" target="_blank">View Deal</a>

  </div>
  `;

  document.getElementById("preview").innerHTML = html;

}
