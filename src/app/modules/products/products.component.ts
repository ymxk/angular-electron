import { MatDialog } from "@angular/material/dialog";
import { DatabaseService } from "./../../services/database.service";
import { HttpClient } from "@angular/common/http";
import { Component, ViewChild, AfterViewInit } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { merge, Observable, of as observableOf } from "rxjs";
import { catchError, map, startWith, switchMap, tap } from "rxjs/operators";
import { RxProductDocument } from "../../services/product.service";

/**
 */
@Component({
  selector: "products",
  styleUrls: ["products.component.scss"],
  templateUrl: "products.component.html"
})
export class ProductsComponent implements AfterViewInit {
  displayedColumns: string[] = [
    "productId",
    "upc",
    "productName",
    "unitSize",
    "unitPrice",
    "createTime"
  ];
  private products: Observable<RxProductDocument[]>;
  isLoadingResults: boolean;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private dbService: DatabaseService, public dialog: MatDialog) {}

  ngAfterViewInit() {
    this.onSearch();
    this.sort.sortChange.subscribe(s => {
      let sort = {};
      sort[s.active] = s.direction;
      this.onSearch(sort);
    });
  }

  onSearch(sort: any = { createTime: "desc" }) {
    this.products = this.dbService.db.product
      .find()
      .sort(sort)
      .$.pipe(tap(() => (this.isLoadingResults = false)));
  }

  goAdd() {}
}
