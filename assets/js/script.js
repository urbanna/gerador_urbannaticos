import { AtpAgent } from '@atproto/api';

document.getElementById('mysub').addEventListener('submit', function(event) {
    event.preventDefault();
    const subdomain = document.getElementById('subdomain').value;
    const result = document.getElementById('result');
    const atprotoConfig = document.getElementById('atprotoConfig');

    // Função para criar a sessão
    async function createSession() {
        const agent = new AtpAgent({ service: 'https://bsky.social' });
        await agent.login({ identifier: 'urbannaticos.com', password: 'pypq-cman-ctem-7dao' });
        console.log('Sessão criada com sucesso!');
        console.log('Access Token:', agent.session.accessJwt);
        console.log('Refresh Token:', agent.session.refreshJwt);

        // Adicione a lógica para gerar o subdomínio aqui
        const subdomainResponse = await generateSubdomain(agent, subdomain);
        console.log('Subdomínio gerado:', subdomainResponse);

        // Atualiza a interface com o subdomínio gerado
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
    }

    // Função para gerar o subdomínio
    async function generateSubdomain(agent, subdomain) {
        // Exemplo de lógica para gerar um subdomínio
        const response = await agent.createSubdomain({ name: subdomain });
        return response.data.subdomain;
    }

    // Chama a função createSession
    createSession();
});
