import { AtpAgent } from '@atproto/api';

const agent = new AtpAgent({ service: 'https://bsky.social' });

async function createSession() {
    await agent.login({ identifier: 'camilaloliveira.com', password: 'MiCas@0801' });
    console.log('Sessão criada com sucesso!');
    console.log('Access Token:', agent.session.accessJwt);
    console.log('Refresh Token:', agent.session.refreshJwt);
}

createSession();
