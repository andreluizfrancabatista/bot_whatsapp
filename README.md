# Chatbot do WhatsApp com Node.js e venom-bot

Este é um exemplo de como criar um chatbot simples usando Node.js e a biblioteca `venom-bot`. O chatbot irá responder com uma mensagem quando receber a palavra "hello" em uma mensagem do WhatsApp.

## Pré-requisitos

- [Node.js](https://nodejs.org/) instalado em seu computador.
- Uma conta no WhatsApp para autenticar o chatbot.

## Configuração

1. Clone ou baixe este repositório em seu computador.

2. No diretório do projeto, instale as dependências usando o seguinte comando:

   ```
   npm install
   ```

3. Execute o chatbot com o seguinte comando:

   ```
   node chatbot.js
   ```

4. Use o aplicativo WhatsApp em seu telefone para escanear o código QR que aparecerá no terminal. Isso autenticará seu chatbot.

## Uso

Após a autenticação, seu chatbot estará pronto para responder quando receber a mensagem "hello" no WhatsApp. Você pode personalizar as respostas e adicionar lógica adicional no arquivo `chatbot.js`.

```javascript
client.onMessage((message) => {
  if (message.body.toLowerCase() === 'hello') {
    client.sendText(message.from, 'Olá! Como posso ajudar?');
  }
});
```
