const { app, BrowserWindow, Menu, ipcMain} = require('electron')
const { autoUpdater } = require('electron-updater');

let win;

function createWindow() {
   win = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    icon: 'icon2.ico',
    title: 'Kode',
    webPreferences:{
      nodeIntegration: true,
      contextIsolation: false
    }
  })
    win.loadFile('index.html');
    
  const splash = new BrowserWindow({
    width: 500, 
    height: 300, 
    transparent: true, 
    frame: false, 
    alwaysOnTop: true 
  })
  splash.loadFile('splash.html');
  splash.center();
  
  win.once('ready-to-show', () => {
    autoUpdater.checkForUpdatesAndNotify();
    splash.destroy();
    win.show();
  });
 
}


app.on('ready', function(){
  createWindow();
  const mainMenu = Menu.buildFromTemplate(tamplate);
  Menu.setApplicationMenu(mainMenu)
});
const tamplate = [
  {label: 'File',
  submenu: [
    {role: 'quit',
    accelerator: 'Ctrl+Q'}
  ],
},
{label: 'Edit',
  submenu:[
    {role: 'undo',
     accelerator: 'Ctrl+Z'},
     {role: 'redo',
    accelerator: 'Shift+Ctrl+Z'
    },
    {
      role: 'copy',
      accelerator: 'Ctrl+C'
    },
    {
      role: 'cut',
      accelerator: 'Ctrl+X'
    },
    {
      role: 'paste',
      accelerator: 'Ctrl+V'
    }
  ]
},
{
  label: 'View',
  submenu:[
    {role: 'reload'},
    {role: 'forceReload'},
  ]
}

]
autoUpdater.on('update-available', () => {
  win.webContents.send('update_available');
});
autoUpdater.on('update-downloaded', () => {
  win.webContents.send('update_downloaded');
});
ipcMain.on('restart_app', () => {
  autoUpdater.quitAndInstall();
});