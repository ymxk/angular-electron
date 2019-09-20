import { Component } from "@angular/core";
import { NzMessageService } from "ng-zorro-antd";
import { ipcRenderer } from "electron";

@Component({
  selector: "printers",
  styleUrls: ["printers.component.scss"],
  templateUrl: "printers.component.html"
})
export class PrintersComponent {
  mapOfExpandData: { [key: string]: boolean } = {};
  printers: any[];
  constructor(private message: NzMessageService) {}

  ngOnInit() {
    ipcRenderer.send("get-printers");
    ipcRenderer.on("async-get-printers-reply", (event, arg) => {
      this.printers = arg;
    });
  }
}
