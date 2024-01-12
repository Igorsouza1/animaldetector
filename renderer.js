// Este código será executado no contexto do navegador (processo de renderização)
const { ipcRenderer } = require('electron');
const { spawn } = require('child_process');

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('select-folder').addEventListener('click', () => {
        ipcRenderer.send('open-directory-dialog');
    });
});

// Listener para receber o caminho da pasta
ipcRenderer.on('selected-directory', (event, path) => {
    console.log('Pasta selecionada:', path);
    // Aqui você pode chamar seu script Python com o caminho da pasta
});

ipcRenderer.on('python-progress', (event, message) => {
    const progressBar = document.getElementById('progress-bar');
    const progressMatch = message.match(/\d+%/); // Procura por um número seguido de um sinal de porcentagem
    const imageCountMatch = message.match(/\d+\/\d+/); // Procura por um padrão como '1/17'

    if (progressMatch) {
        progressBar.style.width = progressMatch[0]; // Atualiza a largura da barra de progresso
        progressBar.textContent = progressMatch[0]; // Atualiza o texto da barra de progresso
    }

    if (imageCountMatch) {
        // Supondo que você tenha um elemento para a contagem de imagens com o id 'image-count'
        const imageCountElement = document.getElementById('image-count');
        imageCountElement.textContent = `Imagens processadas: ${imageCountMatch[0]}`; // Atualiza a contagem de imagens processadas
    } else {
        // Outra saída que não contém progresso ou contagem de imagens pode ser registrada no console
        console.log(message);
    }

    if (message.includes('100%')) {
        // Envie uma mensagem para o main.js para navegar para a terceira página
        ipcRenderer.send('load-complete-page');
    }
    
});

