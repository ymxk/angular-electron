import {
  app,
  BrowserWindow,
  screen,
  globalShortcut,
  ipcMain,
  shell
} from "electron";
import * as path from "path";
import * as url from "url";
const fs = require("fs");
const os = require("os");

let win, serve;
const args = process.argv.slice(1);
serve = args.some(val => val === "--serve");

function createWindow() {
  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: size.width,
    height: size.height,
    webPreferences: {
      nodeIntegration: true
    }
  });
  if (serve) {
    require("electron-reload")(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`)
    });
    win.loadURL("http://localhost:4200");
  } else {
    loadURLInElec();
    globalShortcut.register("F5", loadURLInElec);
    globalShortcut.register("CommandOrControl+R", loadURLInElec);
  }

  if (serve) {
    win.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  win.on("closed", () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
}

function loadURLInElec() {
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, "dist/index.html"),
      protocol: "file:",
      slashes: true
    })
  );
}

function printToPdf() {
  ipcMain.on("print-to-pdf", function(event) {
    const pdfPath = path.join(os.tmpdir(), "print.pdf");
    const win = BrowserWindow.fromWebContents(event.sender);
    win.webContents.print({ silent: true, printBackground: true }, data => {
      if (data) {
        alert("打印完成");
      } else {
        alert("打印取消");
      }
    });
  });
}

try {
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on("ready", () => {
    createWindow();
    printToPdf();
    ipcMain.on("get-printers", function(event) {
      const printers = win.webContents.getPrinters();
      console.log(printers);
      event.sender.send("async-get-printers-reply", printers);
    });
  });

  // Quit when all windows are closed.
  app.on("window-all-closed", () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
      app.quit();
    }
  });

  app.on("activate", () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });
} catch (e) {
  // Catch Error
  // throw e;
}
