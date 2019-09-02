import { AddDictionaryComponent } from "./add-dictionary/add-dictionary.component";
import { Component, ViewChild, AfterViewInit } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { DatabaseService } from "../../services/database.service";
import { MatDialog } from "@angular/material/dialog";
import { RxDictionaryDocument } from "../../services/dictionary.service";
import { AlertComponent } from "../../components/alert/alert.component";
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { NzModalService } from "ng-zorro-antd";
/**
 */
@Component({
  selector: "dictionaries",
  styleUrls: ["dictionaries.component.scss"],
  templateUrl: "dictionaries.component.html",
  providers: [DatabaseService]
})
export class DictionariesComponent implements AfterViewInit {
  private dictionaries: Observable<RxDictionaryDocument[]>;
  validateForm: FormGroup;
  controlArray: any[] = [];
  isCollapse = true;
  isLoadingResults = true;

  toggleCollapse(): void {
    this.isCollapse = !this.isCollapse;
  }

  resetForm(): void {
    this.validateForm.reset();
  }
  constructor(
    private dbService: DatabaseService,
    private modalService: NzModalService,
    public dialog: MatDialog,
    private fb: FormBuilder
  ) {}

  goAdd() {
    this.modalService.create({
      nzTitle: "新增",
      nzContent: AddDictionaryComponent
    });
    return false;
  }

  goUpdate(dic: RxDictionaryDocument) {
    console.log("goUpdate", dic);
    this.modalService.create({
      nzTitle: "更新",
      nzContent: AddDictionaryComponent,
      nzComponentParams: { dic: dic }
    });
    return false;
  }

  onRemoveConfirm(dic: RxDictionaryDocument) {
    dic.remove();
  }

  ngAfterViewInit() {
    this.onSearch();
  }

  search() {
    console.log("search");
    return false;
  }

  onSearch(sort: any = { createTime: "desc" }) {
    this.dictionaries = this.dbService.db.dictionary
      .find()
      .sort(sort)
      .$.pipe(tap(() => (this.isLoadingResults = false)));
    this.isLoadingResults = false;
  }
}
