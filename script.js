document.getElementById('mysub').addEventListener('submit', function(event) {
    event.preventDefault();
    const subdomain = document.getElementById('subdomain').value;
    const result = document.getElementById('result');
    const atprotoConfig = document.getElementById('atprotoConfig');

    // Redireciona para o subdomínio no domínio urbannaticos.com
    const fullUrl = `https://${subdomain}.urbannaticos.com`;
    result.then(function (data) {
        document.getElementById("message").innerHTML =
          "<div class='notification is-link is-light'>" +
          "<div class='icon-text'>" +
          "<span class='icon has-text-info'><i class='fas fa-info-circle'></i></span>" +
          "<span>Seu link é: " +
          "<strong><a href='" +
          data.fullUrl +
          "' target='_blank' class='is-white'>" +
          data.fullUrl +
          "</a></strong>. " +
          "</span>" +
          "</div>" +
          "</div>";
      });
      document.getElementById("linkinput").value = "";

    // Exemplo de configuração do AT Protocol
    const config = `
{
  "subdomain": "${subdomain}",
  "domain": "urbannaticos.com",
  "atproto": {
    "endpoint": "https://${subdomain}.urbannaticos.com",
    "key": "YOUR_API_KEY_HERE"
  }
}`;
    atprotoConfig.textContent = config;

    // Redireciona o navegador para o novo subdomínio após 5 segundos
    setTimeout(() => {
        window.location.href = fullUrl;
    }, 5000);
});