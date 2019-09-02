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
    this.controlArray.forEach((c, index) => {
      c.show = this.isCollapse ? index < 6 : true;
    });
  }

  resetForm(): void {
    this.validateForm.reset();
  }
  constructor(
    private dbService: DatabaseService,
    public dialog: MatDialog,
    private fb: FormBuilder
  ) {
    this.validateForm = this.fb.group({});
    for (let i = 0; i < 10; i++) {
      this.controlArray.push({ index: i, show: i < 6 });
      this.validateForm.addControl(`field${i}`, new FormControl());
    }
  }

  goAdd() {
    this.dialog.open(AddDictionaryComponent, {
      width: "60%"
    });
  }

  goUpdate(dic: RxDictionaryDocument) {
    this.dialog.open(AddDictionaryComponent, {
      width: "60%",
      data: dic
    });
  }

  onRemoveConfirm(dic: RxDictionaryDocument) {
    dic.remove();
  }

  ngAfterViewInit() {
    this.onSearch();
  }

  onSearch(sort: any = { createTime: "desc" }) {
    this.dictionaries = this.dbService.db.dictionary
      .find()
      .sort(sort)
      .$.pipe(tap(() => (this.isLoadingResults = false)));
    this.isLoadingResults = false;
  }
}
