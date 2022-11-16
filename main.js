const { app, BrowserWindow } = require('electron');

const createWindow = () => {
    const win = new BrowserWindow({
        show: false,
        minWidth: 1300,
        minHeight: 840,
    });
    win.maximize();
    win.show();
    // win.setMenuBarVisibility(false);
    win.loadFile('index.html')
};

app.whenReady().then(() => { createWindow(); });
