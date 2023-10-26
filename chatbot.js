const venom = require('venom-bot');

venom.create().then((client) => {
  client.onMessage((message) => {
    if (message.body.toLowerCase() === 'Ola') {
      client.sendText(message.from, 'Hello! Bem-vindo ao mundo automatizado');
    }
  });
}).catch((error) => {
  console.error('Error initializing WhatsApp bot:', error);
});
