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
/**
 */
@Component({
  selector: "dictionaries",
  styleUrls: ["dictionaries.component.scss"],
  templateUrl: "dictionaries.component.html",
  providers: [DatabaseService]
})
export class DictionariesComponent implements AfterViewInit {
  displayedColumns: string[] = [
    "value",
    "label",
    "type",
    "sort",
    "description",
    "remarks",
    "createTime",
    "operation"
  ];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  private emittedFirst = false;
  private dictionaries: Observable<RxDictionaryDocument[]>;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private dbService: DatabaseService, public dialog: MatDialog) {}

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
    this.sort.sortChange.subscribe(s => {
      let sort = {};
      sort[s.active] = s.direction;
      this.onSearch(sort);
    });
  }

  onSearch(sort: any = { createTime: "desc" }) {
    this.dictionaries = this.dbService.db.dictionary
      .find()
      .sort(sort)
      .$.pipe(tap(() => (this.isLoadingResults = false)));
    this.isLoadingResults = false;
  }
}
