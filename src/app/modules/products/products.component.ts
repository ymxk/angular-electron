import { DatabaseService } from "./../../services/database.service";
import { HttpClient } from "@angular/common/http";
import { Component, ViewChild, AfterViewInit, OnInit } from "@angular/core";
import { merge, Observable, of as observableOf } from "rxjs";
import { catchError, map, startWith, switchMap, tap } from "rxjs/operators";
import { RxProductDocument } from "../../services/product.service";
import { NzModalService } from "ng-zorro-antd";
import { Pageable } from "../../model/pageable";

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
  loading: boolean = true;
  pageable: Pageable = new Pageable();
  params = {
    upc: "",
    productName: ""
  };

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

  onSearch(
    reset: boolean = false,
    pageable: Pageable = this.pageable,
    sort: any = { createTime: "desc" }
  ) {
    this.loading = true;
    if (reset) this.pageable.pageIndex = 1;
    const dic = this.dbService.db.product;
    dic
      .find()
      .exec()
      .then(data => (pageable.total = data.length));
    this.products = dic
      .find({
        upc: { $regex: `${this.params.upc}` },
        productName: { $regex: `${this.params.productName}` }
      })
      .sort(sort)
      .skip(pageable.skip())
      .limit(pageable.pageSize)
      .$.pipe(tap(() => (this.loading = false)));
    return false;
  }
  goUpdate() {
    return false;
  }
}
