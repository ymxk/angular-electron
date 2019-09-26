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
import { ipcRenderer, BrowserWindow } from "electron";

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

  onPrint(event: Event) {
    let reqid;
    event.stopPropagation();
    let printHtml = this.elementRef.nativeElement.querySelector("#print");
    ipcRenderer.once("print-cancel", (event, arg) => {
      console.log("print-cancel");
      this.message.remove(reqid);
      this.message.error(`打印异常，请检查打印机！`);
    });
    ipcRenderer.once("print-succeed", (event, arg) => {
      console.log("print-succeed");
      this.message.remove(reqid);
      this.message.success(`打印完成`);
    });
    ipcRenderer.once("print-request", (event, arg) => {
      console.log("request");
      ipcRenderer.send("print", "");
      reqid = this.message.loading("打印中", { nzDuration: 0 }).messageId;
    });
    ipcRenderer.send("load-print-win", printHtml.innerHTML);
  }

  onSavePdf(event: Event) {
    console.log("onSavePdf");
    event.stopPropagation();
    let printHtml = this.elementRef.nativeElement.querySelector("#print");
    ipcRenderer.once("save-pdf-request", (event, arg) => {
      console.log("save-pdf-request");
      ipcRenderer.send("save-to-pdf");
    });
    ipcRenderer.send("load-to-pdf", printHtml.innerHTML);
  }

  printPreview() {
    this.modalService.create({
      nzTitle: "预览",
      nzWidth: 1000,
      nzContent: PrintSalesSlipPreviewComponent
    });
    return false;
  }

  addGoods(event: Event) {
    event.stopPropagation();
    console.log(this.selectedGoods);
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
