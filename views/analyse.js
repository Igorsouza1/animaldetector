// analyse.js
const { ipcRenderer } = require('electron');

ipcRenderer.on('megadetector-progress', (event, message) => {
    // Atualize o elemento da tela de análise com a mensagem recebida
    const progressElement = document.getElementById('progress');
    progressElement.textContent += message + '\n'; // Adicione a nova mensagem ao conteúdo existente
});
