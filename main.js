const { app, BrowserWindow, ipcMain, dialog  } = require('electron');
const { spawn } = require('child_process');


let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        // Suas configurações de janela
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    mainWindow.loadFile('views/index.html');
}

app.whenReady().then(createWindow);


function showNotification(title, body) {
    new Notification({ title, body }).show();
}

// Listener para abrir o diálogo de seleção de pasta
ipcMain.on('open-directory-dialog', async (event) => {
    const result = await dialog.showOpenDialog(mainWindow, {
        properties: ['openDirectory']
    });

    if (!result.canceled && result.filePaths.length > 0) {
        const selectedFolderPath = result.filePaths[0];
        
        // Aguarde a página `analyse.html` ser carregada antes de iniciar o Python.
        mainWindow.loadFile('views/analyse.html').then(() => {
            const pythonProcess = spawn('python', ['python/megadetector.py', selectedFolderPath]);

            pythonProcess.stdout.on('data', (data) => {
                mainWindow.webContents.send('python-progress', data.toString());
            });

            pythonProcess.stderr.on('data', (data) => {
                mainWindow.webContents.send('python-progress', data.toString());
            });
        });
    }
});

ipcMain.on('load-complete-page', () => {
    mainWindow.loadFile('views/complete.html');
});

ipcMain.on('open-output-directory-dialog', async (event) => {
    const result = await dialog.showOpenDialog(mainWindow, { properties: ['openDirectory'] });
    if (!result.canceled && result.filePaths.length > 0) {
        const outputFolderPath = result.filePaths[0];
        const pythonProcess = spawn('python', ['python/outputfiles.py', outputFolderPath]);

        // ... código para manipular stdout e stderr ...

        

        pythonProcess.on('close', async (code) => {
            mainWindow.webContents.send('outputfiles-done', code);
            if (code === 0) {
                // Exibe uma caixa de diálogo modal com uma mensagem de sucesso
                await dialog.showMessageBox(mainWindow, {
                    type: 'info',
                    title: 'Processo Concluído',
                    message: 'Imagens separadas com Sucesso',
                    buttons: ['OK']
                });
            } else {
                // Tratar erros, se necessário
                console.error(`outputfiles.py finalizado com o código ${code}`);
            }
        });
    }
});


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('before-quit', () => {
    // Encerra o processo Python se ele ainda estiver em execução
    if (pythonProcess != null && !pythonProcess.killed) {
        pythonProcess.kill();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
