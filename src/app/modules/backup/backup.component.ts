import { Component } from "@angular/core";
import { DatabaseService } from "../../services/database.service";
import * as moment from "moment";
import { NzMessageService, NzModalService } from "ng-zorro-antd";
import { dbconf, dburl } from "../../services/config";
import { PouchDBService } from "../../services/pouch-db";

@Component({
  selector: "backup",
  styleUrls: ["backup.component.scss"],
  templateUrl: "backup.component.html",
  providers: [PouchDBService]
})
export class BackupComponent {
  isLoadingDownload = false;
  isLoadingImport = false;
  isLoadingCloudUp = false;
  isLoadingCloudDownload = false;
  isLoadingRemove = false;
  dbData: any;

  constructor(
    private dbService: DatabaseService,
    private message: NzMessageService,
    private pouchDBService: PouchDBService,
    private modalService: NzModalService
  ) {}

  ngOnInit() {
    this.dbService.db.$.subscribe(changeEvent => console.dir(changeEvent));
    this.dbService.db.dump().then(json => {
      console.dir(json);
      this.dbData = json;
    });
  }

  download() {
    this.isLoadingDownload = true;
    this.dbService.db.dump().then(json => {
      console.dir(json);
      this.exportToJsonFile(json);
      this.isLoadingDownload = false;
    });
  }

  beforeUpload = (file: File): boolean => {
    let self = this;
    let reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = function(e) {
      console.log(JSON.parse(this.result.toString()));
      self.importDump(JSON.parse(this.result.toString()));
    };
    return false;
  };

  importDump(json: any) {
    this.isLoadingImport = true;
    this.dbService.db
      .importDump(json)
      .then(() => {
        console.log("done");
        let m = [];
        json.collections.forEach(v => {
          m.push(`${v.name} 表 ${v.docs.length} 条数据`);
        });
        this.message.success(`导入成功：${m.join(",")}`);
      })
      .catch(err => {
        console.log(err);
        this.message.error(`导入失败：${err.status} ${err.message}`);
      })
      .finally(() => {
        this.isLoadingImport = false;
      });
  }

  removeConfirm() {
    this.modalService.confirm({
      nzTitle: "提示",
      nzContent: `<b style="color: red;">确认要清空数据库，清空后所有数据将删除，此操作不可恢复！</b>`,
      nzOkType: "danger",
      nzOnOk: () => this.removeAllData()
    });
  }

  removeAllData() {
    this.isLoadingRemove = true;
    this.dbService.db
      .remove()
      .then(res => {
        this.message.success(`清空库成功`);
      })
      .catch(err => {
        console.log(err);
        this.message.error(`清空库失败：${err.status} ${err.message}`);
      })
      .finally(() => {
        this.isLoadingRemove = false;
      });
  }

  cloudUp() {
    try {
      this.isLoadingCloudUp = true;
      this.pouchDBService.db.rel.find("dictionary").then(res => {
        console.log(res);
      });
      console.log(this.pouchDBService.db);
      this.pouchDBService.db.replicate.to(
        "http://127.0.0.1:5984/erpdb",
        dbconf.syncOpts,
        err => {
          console.log(err);
          this.message.success(`云备份成功`);
          this.isLoadingCloudUp = false;
        }
      );
    } catch (error) {
      console.error(error);
      this.isLoadingCloudUp = false;
    }
  }
  cloudDownload() {
    try {
      this.isLoadingCloudDownload = true;
      this.pouchDBService.db.replicate.from(
        "http://127.0.0.1:5984/erpdb",
        dbconf.syncOpts,
        err => {
          console.log(err);
          this.message.success(`云同步成功`);
          this.isLoadingCloudDownload = false;
        }
      );
    } catch (error) {
      console.error(error);
      this.isLoadingCloudDownload = false;
    }
  }

  exportToJsonFile(jsonData) {
    let dataStr = JSON.stringify(jsonData);
    let dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

    let exportFileDefaultName = `backup-${moment().format("YYYY-MM-DD")}.json`;

    let linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  }
}
