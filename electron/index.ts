// Native
import { join } from 'path';

// Packages
import { BrowserWindow, app, ipcMain, IpcMainEvent, globalShortcut } from 'electron';
import isDev from 'electron-is-dev';

const height = 720;
const width = 1280;

let window: BrowserWindow | null = null;

function createWindow() {
  // Create the browser window.
  window = new BrowserWindow({
    width,
    height,
    //  change to false to use AppBar
    frame: true,
    show: true,
    resizable: true,
    fullscreenable: true,
    autoHideMenuBar: true,
    webPreferences: {
      preload: join(__dirname, 'preload.js')
    }
  });

  const port = process.env.PORT || 3000;
  const url = isDev ? `http://localhost:${port}` : join(__dirname, '../src/out/index.html');

  // and load the index.html of the app.
  if (isDev) {
    window?.loadURL(url);
  } else {
    window?.loadFile(url);
  }
  // Open the DevTools.
  // window.webContents.openDevTools();

  // For AppBar
  ipcMain.on('minimize', () => {
    // eslint-disable-next-line no-unused-expressions
    window?.isMinimized() ? window?.restore() : window?.minimize();
    // or alternatively: win.isVisible() ? win.hide() : win.show()
  });
  ipcMain.on('maximize', () => {
    // eslint-disable-next-line no-unused-expressions
    window?.isMaximized() ? window?.restore() : window?.maximize();
  });

  ipcMain.on('close', () => {
    window?.close();
  });

  // Запрет на перезагрузку горячими клавишами
  globalShortcut.register('CommandOrControl+R', () => {
    console.log('Preventing reload...');
  });
  
  globalShortcut.register('Shift+CommandOrControl+R', () => {
    console.log('Preventing reload with Shift...');
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  app.on('ready', () => {
    // Зарегистрируем глобальную горячую клавишу для Ctrl+R
    const preventReloadShortcut = globalShortcut.register('CommandOrControl+R', () => {
      // Предотвратим выполнение действия по умолчанию (перезагрузку приложения)
      console.log('Preventing reload...');
    });
  
    // Проверим, успешно ли зарегистрировалась горячая клавиша
    if (!preventReloadShortcut) {
      console.error('Failed to register prevent reload shortcut');
    }
  });
  
  // Освободим ресурсы при закрытии приложения
  app.on('will-quit', () => {
    // Удалим глобальную горячую клавишу
    globalShortcut.unregisterAll();
  });
  
  // Quit when all windows are closed, except on macOS. There, it's common
  // for applications and their menu bar to stay active until the user quits
  // explicitly with Cmd + Q.
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      console.log('quit');
      app.quit();
    }
  });
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// listen the channel `message` and resend the received message to the renderer process
ipcMain.on('message', (event: IpcMainEvent, message: unknown) => {
  console.log(message);
  setTimeout(() => event.sender.send('message', 'hi from electron'), 500);
});
