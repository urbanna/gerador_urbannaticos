import { AtpAgent } from '@atproto/api';

document.getElementById('myForm').addEventListener('submit', async function(event) {
  event.preventDefault();
  const subdomain = document.getElementById('subdomain').value;
  const result = document.getElementById('result');
  const atprotoConfig = document.getElementById('atprotoConfig');

  try {
    const agent = new AtpAgent({ service: 'https://bsky.social' });
    await agent.login({ identifier: 'urbannaticos.com', password: 'pypq-cman-ctem-7dao' });
    console.log('Sessão criada com sucesso!');
    console.log('Access Token:', agent.session.accessJwt);
    console.log('Refresh Token:', agent.session.refreshJwt);

    // Certifique-se de que o método 'generateSubdomain' é válido
    const subdomainResponse = await generateSubdomain(agent, subdomain);
    const fullUrl = `https://${subdomain}.urbannaticos.com`;

    const config = `
    {
    "subdomain": "${subdomain}",
    "domain": "urbannaticos.com",
    "atproto": {
      "endpoint": "https://${subdomain}.urbannaticos.com",
      "key": "YOUR_API_KEY_HERE"
    }
    }`;

    document.getElementById("message").innerHTML =
      "<div class='notification is-link is-light'>" +
      "<div class='icon-text'>" +
      "<span class='icon has-text-info'><i class='fas fa-info-circle'></i></span>" +
      "<span>Seu link é: " +
      "<strong><a href='" +
      fullUrl +
      "' target='_blank' class='is-white'>" +
      fullUrl +
      "</a></strong>.<p>" + config + "</p>" +
      "</span>" +
      "</div>" +
      "</div>";

    atprotoConfig.textContent = config;

    console.log("Sessão criada com sucesso!");
    console.log('Subdomínio gerado:', subdomainResponse);

  } catch (error) {
    console.error('Erro ao criar a sessão ou gerar subdomínio:', error);
    result.textContent = 'Erro ao criar a sessão ou gerar subdomínio. Verifique o console para mais detalhes.';
  }
});

async function generateSubdomain(agent, subdomain) {
    // Verifique a documentação para o método correto
    const response = await agent.createSubdomain({ name: subdomain });
    return response.data.subdomain;
}
