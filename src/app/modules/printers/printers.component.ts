import { Component } from "@angular/core";
import { NzMessageService } from "ng-zorro-antd";
import { ipcRenderer } from "electron";
const { BrowserWindow } = require('electron').remote

@Component({
  selector: "printers",
  styleUrls: ["printers.component.scss"],
  templateUrl: "printers.component.html"
})
export class PrintersComponent {
  mapOfExpandData: { [key: string]: boolean } = {};
  printers: any[];
  rectangle: any;
  isVisiblePrintWin: boolean;
  onGetBoundsLoading: boolean = false;
  constructor(private message: NzMessageService) {}

  ngAfterViewInit() {}

  onHidePrintWin() {
    ipcRenderer.send("hide-print-win");
    this.isVisiblePrintWin = false;
  }

  onShowPrintWin() {
    ipcRenderer.send("show-print-win");
    this.isVisiblePrintWin = true;
  }

  onGetPrinters() {
    ipcRenderer.send("get-printers");
    ipcRenderer.on("async-get-printers-reply", (event, arg) => {
      this.printers = arg;
    });
  }

  onGetBounds() {
    console.log("onGetBounds", BrowserWindow);
    this.onGetBoundsLoading = true;
    ipcRenderer.send("get-print-win-bounds");
    ipcRenderer.once("get-print-win-bounds-reply", (event, arg) => {
      this.rectangle = arg;
      console.log("get-print-win-bounds-reply", arg);
    });
    this.onGetBoundsLoading = false;
  }
}
