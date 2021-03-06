/**
 * @desc electron ä¸»å¥å£
 */
const path = require('path');
const { app, BrowserWindow } = require('electron');

function isDev() {
  // ð è¿è®°å¾æä»¬éç½®ä¸­éè¿ webpack.DefinePlugin å®ä¹çæå»ºåéå
  return process.env.NODE_ENV === 'development';
}

function createWindow() {
  // åå»ºæµè§å¨çªå£
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      devTools: true,
      nodeIntegration: true, // æ³¨å¥nodeæ¨¡å
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  if (isDev()) {
    // ð çå°äºåï¼å¨å¼åç¯å¢ä¸ï¼æä»¬å è½½çæ¯è¿è¡å¨ 7001 ç«¯å£ç React
    mainWindow.loadURL(`http://127.0.0.1:7001`);
  } else {
    mainWindow.loadURL(`file://${path.join(__dirname, '../dist/index.html')}`);
  }
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
  app.on('window-all-closed', function () {
    console.log('all window close');
    if (process.platform !== 'darwin') app.quit()
  })
});
