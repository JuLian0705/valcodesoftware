const respuestasBot = {
};

  let chatInitialized = false;

  function toggleChat() {
    const chat = document.getElementById('chatContainer');
    const body = document.getElementById('chatBody');
    chat.classList.toggle('active');

    if (!chatInitialized && chat.classList.contains('active')) {
      const botMsg = document.createElement('div');
      botMsg.className = 'bot-message';
      botMsg.innerText = 'Bienvenido a KekopIA';
      body.appendChild(botMsg);

      const options = document.createElement('div');
      options.className = 'chat-options';
      body.appendChild(options);

      chatInitialized = true;
    }
  }

  function sendOption(text) {
    const body = document.getElementById('chatBody');
    
    const userMsg = document.createElement('div');
    userMsg.className = 'user-message'; // Clase personalizada
    userMsg.innerText = `Tú: ${text}`;
    body.appendChild(userMsg);

    const reply = document.createElement('div');
    reply.className = 'bot-message';
    reply.innerText = `KekoIA está procesando "${text}"...`;
    body.appendChild(reply);
  }
  
function sendUserMessage() {
  const input = document.getElementById('userInput');
  const text = input.value.trim();
  if (text === '') return;

  const body = document.getElementById('chatBody');

  // Crear mensaje del usuario
  const userMsg = document.createElement('div');
  userMsg.className = 'user-message'; 
  userMsg.innerText = `Tú: ${text}`;
  body.appendChild(userMsg);

  const reply = document.createElement('div');
  reply.className = 'bot-message';

  const lowerText = text.toLowerCase();
  if (respuestasBot[lowerText]) {
    reply.innerText = respuestasBot[lowerText];
  } else {
    reply.innerText = `No entendí eso 🤖. ¿Podrías reformularlo?`;
  }

  body.appendChild(reply);

  input.value = '';
  body.scrollTop = body.scrollHeight;
}
