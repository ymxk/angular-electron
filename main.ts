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
const os = require("os");

let win, printWin, serve;
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

function createPrintWin() {
  printWin = new BrowserWindow({ width: 800, height: 300, show: false });
  ipcMain.on("load-print-win", (event, arg) => {
    const css =
      "body{font-size:13px;}.flex-c{display:flex;flex-flow:row wrap;justify-content:space-around;width:100%;}.three-c > div{width:33% !important;display:inline-block;height:30px;line-height:30px;}.three-c > div > label{width:70px;display:inline-block;text-align:right;padding-right:10px;}.five-c > div{width:20% !important;display:inline-block;height:30px;line-height:30px;}.five-c > div > label{width:70px;display:inline-block;text-align:right;padding-right:10px;}.five-c > div > input{width:calc(100% - 100px);}.two-c > div:first-child{width:66%;display:inline-block;height:30px;line-height:30px;}.two-c > div:last-child{width:33%;display:inline-block;height:30px;line-height:30px;}.two-c > div > label{width:70px;display:inline-block;text-align:right;padding-right:10px;}.two-c > div > input{width:calc(100% - 100px);}.label{width:70px;display:inline-block;text-align:right;padding-right:10px;}.flex-c > div{width:33%;display:inline-block;height:30px;line-height:30px;}.flex-c > div > label{width:70px;display:inline-block;text-align:right;padding-right:10px;}.flex-c > div > input{width:calc(100% - 100px);}.print-d table{width:100%;border-collapse:collapse;border:0.5px solid black;}.text-r{text-align:right !important;}.text-l{text-align:left !important;}.p-table tr td{border:0.5px solid black;padding:0 5px;font-size:13px;}.p-table tr  td:nth-child(6){text-align:right;}.p-table tr td:nth-child(7){text-align:right;}.p-table tr td:nth-child(8){text-align:right;}";
    printWin.loadURL(
      `data:text/html;charset=utf-8,<head> <meta http-equiv="Content-Type" content="text/html; charset=utf-8" /> <meta name="viewport" content="width=device-width, initial-scale=1.0" /> <title>打印调试</title> <style type="text/css">${css}</style></head> <body>${arg}</body>`
    );
    ipcMain.once("print", (event, arg) => {
      console.log("start print");
      printWin.webContents.print(
        { silent: true, printBackground: true },
        data => {
          if (data) {
            console.log("打印成功");
            event.sender.send("print-succeed", arg);
          } else {
            console.log("打印取消");
            event.sender.send("print-cancel", arg);
          }
        }
      );
    });
    printWin.webContents.once("did-finish-load", () => {
      event.sender.send("print-request");
      console.log("did-finish-load");
    });
  });
  ipcMain.on("get-print-win-visible", (event, arg) => {
    event.sender.send("get-print-win-visible-reply", printWin.isVisible());
  });
  ipcMain.on("show-print-win", (event, arg) => {
    printWin.show();
  });
  ipcMain.on("hide-print-win", (event, arg) => {
    printWin.hide();
  });
}

function saveToPdf() {
  console.log("saveToPdf");
  ipcMain.on("load-to-pdf", (event, arg) => {
    const css =
      "body{font-size:13px;}.flex-c{display:flex;flex-flow:row wrap;justify-content:space-around;width:100%;}.three-c > div{width:33% !important;display:inline-block;height:30px;line-height:30px;}.three-c > div > label{width:70px;display:inline-block;text-align:right;padding-right:10px;}.five-c > div{width:20% !important;display:inline-block;height:30px;line-height:30px;}.five-c > div > label{width:70px;display:inline-block;text-align:right;padding-right:10px;}.five-c > div > input{width:calc(100% - 100px);}.two-c > div:first-child{width:66%;display:inline-block;height:30px;line-height:30px;}.two-c > div:last-child{width:33%;display:inline-block;height:30px;line-height:30px;}.two-c > div > label{width:70px;display:inline-block;text-align:right;padding-right:10px;}.two-c > div > input{width:calc(100% - 100px);}.label{width:70px;display:inline-block;text-align:right;padding-right:10px;}.flex-c > div{width:33%;display:inline-block;height:30px;line-height:30px;}.flex-c > div > label{width:70px;display:inline-block;text-align:right;padding-right:10px;}.flex-c > div > input{width:calc(100% - 100px);}.print-d table{width:100%;border-collapse:collapse;border:0.5px solid black;}.text-r{text-align:right !important;}.text-l{text-align:left !important;}.p-table tr td{border:0.5px solid black;padding:0 5px;font-size:13px;}.p-table tr  td:nth-child(6){text-align:right;}.p-table tr td:nth-child(7){text-align:right;}.p-table tr td:nth-child(8){text-align:right;}";
    printWin.loadURL(
      `data:text/html;charset=utf-8,<head> <meta http-equiv="Content-Type" content="text/html; charset=utf-8" /> <meta name="viewport" content="width=device-width, initial-scale=1.0" /> <title>打印调试</title> <style type="text/css">${css}</style></head> <body>${arg}</body>`
    );
    printWin.webContents.once("did-finish-load", () => {
      event.sender.send("save-pdf-request");
      console.log("did-finish-load");
    });
  });
  ipcMain.on("save-to-pdf", event => {
    const fs = require("fs");
    const pdfPath = path.join(os.tmpdir(), "print.pdf");
    printWin.webContents.printToPDF({}, (error, data) => {
      if (error) throw error;
      fs.writeFile(pdfPath, data, error => {
        if (error) throw error;
        shell.openExternal(`file://${pdfPath}`);
      });
    });
  });
}

function getPrinters() {
  ipcMain.on("get-printers", event => {
    const printers = win.webContents.getPrinters();
    event.sender.send("async-get-printers-reply", printers);
  });
}

function getPrintWinBounds() {
  ipcMain.on("get-print-win-bounds", (event, arg) => {
    console.log("get-print-win-bounds");
    const rectangle = printWin.getBounds();
    console.log("rectangle=", rectangle, printWin.getSize());
    event.sender.send("get-print-win-bounds-reply", rectangle);
  });
}

try {
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on("ready", () => {
    createWindow();
    if (!serve) {
      createPrintWin();
      saveToPdf();
      getPrinters();
      getPrintWinBounds();
    }
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
