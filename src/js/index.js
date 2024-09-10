import { AtpAgent } from '@atproto/api';

//MENU

document.addEventListener("DOMContentLoaded", () => {
  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll(".navbar-burger"),
    0
  );

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {
    // Add a click event on each of them
    $navbarBurgers.forEach((el) => {
      el.addEventListener("click", () => {
        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle("is-active");
        $target.classList.toggle("is-active");
      });
    });
  }
});

$(document).ready(function () {
  // Check for click events on the navbar burger icon
  $(".navbar-burger").click(function () {
    // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");
  });
});

$(document).ready(function () {
  // Check for click events on the navbar burger icon
  $(".navbar-burger").click(function () {
    // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");
  });
});



document.getElementById('myForm').addEventListener('submit', async function(event) {
  event.preventDefault();
  const subdomain = document.getElementById('subdomain').value;
  const result = document.getElementById('result');
  const atprotoConfig = document.getElementById('atprotoConfig');

  try {
      const agent = new AtpAgent({ service: 'https://bsky.social' });
      await agent.login({ identifier: 'urbannaticos.com', password: 'pypq-cman-ctem-7dao' });

      // Gera o subdomínio
      const subdomainResponse = await generateSubdomain(agent, subdomain);

      // Constrói a URL completa e a configuração do Atproto
      const fullUrl = `https://${subdomain}.urbannaticos.com`;
      const config = `
      {
        "subdomain": "${subdomain}",
        "domain": "urbannaticos.com",
        "atproto": {
          "endpoint": "https://${subdomain}.urbannaticos.com",
          "key": "YOUR_ACTUAL_API_KEY" // Substitua pela sua chave API
        }
      }`;

      // Exibe o resultado e a configuração
      result.textContent = `Subdomínio gerado com sucesso!`;
      atprotoConfig.textContent = config;

  } catch (error) {
      console.error('Erro ao criar a sessão ou gerar subdomínio:', error);
      result.textContent = 'Erro ao criar a sessão ou gerar subdomínio. Verifique o console para mais detalhes.';
  }
});

async function generateSubdomain(agent, subdomain) {
  try {
    const response = await agent.createSubdomain({ name: subdomain });
    return response.data.subdomain;
  } catch (error) {
    console.error('Erro ao gerar subdomínio:', error);
    throw error; // Reencaminha o erro para ser capturado no bloco catch principal
  }
}
