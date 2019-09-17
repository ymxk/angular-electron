import { DatabaseService } from "./../../services/database.service";
import { HttpClient } from "@angular/common/http";
import { Component, ViewChild, AfterViewInit, OnInit } from "@angular/core";
import { merge, Observable, of as observableOf } from "rxjs";
import { catchError, map, startWith, switchMap, tap } from "rxjs/operators";
import { RxProductDocument } from "../../services/product.service";
import { NzModalService } from "ng-zorro-antd";

/**
 */
@Component({
  selector: "products",
  styleUrls: ["products.component.scss"],
  templateUrl: "products.component.html"
})
export class ProductsComponent implements OnInit {
  displayedColumns: string[] = [
    "productId",
    "upc",
    "productName",
    "unitSize",
    "unitPrice",
    "createTime"
  ];
  products: Observable<RxProductDocument[]>;
  isLoadingResults: boolean;

  constructor(
    private dbService: DatabaseService,
    private modalService: NzModalService
  ) {}

  ngOnInit() {
    this.onSearch();
  }

  onRemoveConfirm(doc: RxProductDocument) {
    this.modalService.confirm({
      nzTitle: "提示",
      nzContent: `<b style="color: red;">确认删除此数据</b>`,
      nzOkType: "danger",
      nzOnOk: () => doc.remove()
    });
  }

  onSearch(sort: any = { createTime: "desc" }) {
    this.products = this.dbService.db.product
      .find()
      .sort(sort)
      .$.pipe(tap(() => (this.isLoadingResults = false)));
  }
  search() {
    console.log("search");
    this.onSearch();
    return false;
  }
  goUpdate() {
    return false;
  }
}
