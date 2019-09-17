import { RxProductDocument } from "./../../services/product.service";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Component, ElementRef, HostListener, ViewChild } from "@angular/core";
import { DatabaseService } from "../../services/database.service";
import * as moment from "moment";
import * as jspath from "jspath";
import {
  NzMessageService,
  NzModalService,
  NzInputDirective
} from "ng-zorro-antd";
import { Observable, of, BehaviorSubject } from "rxjs";
import * as printJS from "print-js";
import { PrintSalesSlipPreviewComponent } from "./preview/print-sales-slip-preview.component";
import { tap } from "rxjs/operators";
import * as numeral from "numeral";
import { SaleSlip } from "../../model/sale-slip";

@Component({
  selector: "print-sales-slip",
  styleUrls: ["print-sales-slip.component.scss"],
  templateUrl: "print-sales-slip.component.html"
})
export class PrintSalesSlipComponent {
  validateForm: FormGroup;
  saleSlip: SaleSlip = new SaleSlip();
  orders = [];
  goodsList: Observable<RxProductDocument[]>;
  selectedGoods = null;
  isLoading = false;
  searchChange$ = new BehaviorSubject("");
  editId: string | null;
  totalQty: string | null;
  totalAuxQty: string | null;
  amount: string | null;
  editCache: { [key: string]: any } = {};
  constructor(
    private dbService: DatabaseService,
    private message: NzMessageService,
    private modalService: NzModalService,
    private fb: FormBuilder,
    private elementRef: ElementRef
  ) {}

  ngOnInit() {
    this.validateForm = this.fb.group({
      formLayout: ["horizontal"],
      fieldA: [null, [Validators.required]],
      filedB: [null, [Validators.required]]
    });
    this.saleSlip.createTime = moment().format("YYYY-MM-DD");
    this.saleSlip.serialNum = `XS-${moment().format("YYYY-MM-DD-HHMM")}`;

    this.goodsList = this.dbService.db.product.find().$.pipe(
      tap(() => {
        this.isLoading = false;
      })
    );
  }

  calc() {
    this.totalQty = this.orders
      .map(e => e.quantity)
      .reduce((a, b) => numeral(a).add(b), 0)
      .value();

    this.totalAuxQty = this.orders
      .map(e => e.quantityPerUnit)
      .reduce((a, b) => numeral(a).add(b), 0)
      .value();

    this.orders.forEach(e => {
      e.subAmount = numeral(e.unitPrice)
        .multiply(e.quantity)
        .value();
    });

    this.amount = this.orders
      .map(e => e.subAmount)
      .reduce((a, b) => numeral(a).add(b), 0)
      .value();
  }

  startEdit(i, v: any): void {
    this.editId = v.id;
  }

  saveEdit(i, v: any): void {
    this.editId = null;
    console.log(v);
    this.calc();
  }

  cancelEdit(i, v: any): void {
    this.editId = null;
  }

  loadMore(): void {
    this.isLoading = true;
  }

  onSearch(value: string): void {
    this.isLoading = true;
    this.goodsList = this.dbService.db.product.find().$.pipe(
      tap(() => {
        this.isLoading = false;
        this.searchChange$.next(value);
      })
    );
  }

  onRemove(v) {
    this.orders = this.orders.filter(e => {
      return e.id != v.id;
    });
  }

  print() {
    let printHtml = this.elementRef.nativeElement.querySelector("div");
    console.dir(printHtml.innerHTML);
    printJS({
      printable: printHtml.innerHTML,
      type: "raw-html",
      style:
        ".flex-c{display:flex;flex-flow:row wrap;justify-content:space-around;width:100%;}.five-c > div{width:20%;display:inline-block;height:30px;line-height:30px;}.five-c > div > label{@extend .label;}.two-c > div:first-child{width:66%;display:inline-block;height:30px;line-height:30px;}.two-c > div:last-child{width:33%;display:inline-block;height:30px;line-height:30px;}.two-c > div > label{@extend .label;}.label{width:70px;display:inline-block;text-align:right;padding-right:10px;}.print-h{display:flex;flex-flow:row wrap;justify-content:space-around;width:100%;}.print-h > div{width:33%;display:inline-block;height:30px;line-height:30px;}.print-h > div > label{width:70px;display:inline-block;text-align:right;padding-right:10px;}.print-d > table{width:100%;}.text-r{text-align:right !important;}.text-l{text-align:left !important;}.p-table > tr > td{border:1px solid;padding:0 5px;}.p-table > tr > td:nth-child(6){text-align:right;}.p-table > tr > td:nth-child(7){text-align:right;}.p-table > tr > td:nth-child(8){text-align:right;}"
    });
    return false;
  }

  printPreview() {
    this.modalService.create({
      nzTitle: "预览",
      nzWidth: 1000,
      nzContent: PrintSalesSlipPreviewComponent
    });
    return false;
  }

  addGoods() {
    if (!this.selectedGoods) {
      this.message.warning("请选择商品");
      return;
    }
    const ed = this.selectedGoods.toJSON();
    if (jspath.apply(".upc", this.orders).includes(ed.upc)) {
      this.message.warning(`已选择 ${ed.productName}`);
      return;
    }
    ed.quantity = 5;
    this.orders = [...this.orders, ed];
    this.selectedGoods = null;
    this.calc();
    console.log(this.orders);
  }
}
