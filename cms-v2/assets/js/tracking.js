// Load GA4 script dynamically
(function () {
  var script = document.createElement("script");
  script.async = true;
  script.src = "https://www.googletagmanager.com/gtag/js?id=G-5CJWPF4PDJ";
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  window.gtag = gtag;

  gtag("js", new Date());
  gtag("config", "G-5CJWPF4PDJ");
})();
