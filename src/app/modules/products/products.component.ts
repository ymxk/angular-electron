import { DatabaseService } from "./../../services/database.service";
import { HttpClient } from "@angular/common/http";
import { Component, ViewChild, AfterViewInit } from "@angular/core";
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

  constructor(private dbService: DatabaseService) {}

  ngAfterViewInit() {
    this.onSearch();
  }

  onSearch(sort: any = { createTime: "desc" }) {
    this.products = this.dbService.db.product
      .find()
      .sort(sort)
      .$.pipe(tap(() => (this.isLoadingResults = false)));
  }
  search() {
    console.log("search");
    return false;
  }
  goAdd() {
    return false;
  }
}
