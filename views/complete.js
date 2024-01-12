// complete.js
const { ipcRenderer } = require('electron');

document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    loader.style.display = 'none'; // Esconde o loader inicialmente

    document.getElementById('select-output-folder').addEventListener('click', () => {
        loader.style.display = 'block'; // Mostra o loader
        ipcRenderer.send('open-output-directory-dialog');
    });

    ipcRenderer.on('outputfiles-done', (event, code) => {
        loader.style.display = 'none'; // Esconde o loader quando o processamento estiver concluído
    });
});
