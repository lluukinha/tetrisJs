const { app, BrowserWindow } = require('electron');

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1280,
        height: 800,
        minHeight: 800,
        minWidth: 1280,
        fullscreen: true
    });
    win.setMenuBarVisibility(false);
    win.loadFile('index.html');
};

app.whenReady().then(() => { createWindow(); });
