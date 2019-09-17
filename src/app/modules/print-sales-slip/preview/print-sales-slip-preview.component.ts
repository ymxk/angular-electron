import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Component, ElementRef } from "@angular/core";
import { DatabaseService } from "../../../services/database.service";
import { NzMessageService, NzModalService } from "ng-zorro-antd";
import * as printJS from "print-js";

@Component({
  selector: "print-sales-slip-preview",
  styleUrls: ["print-sales-slip-preview.component.scss"],
  templateUrl: "print-sales-slip-preview.component.html"
})
export class PrintSalesSlipPreviewComponent {
  validateForm: FormGroup;
  orders = [{}, {}];
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
  }

  print() {
    let divEle = this.elementRef.nativeElement.querySelector("#print");
    console.dir(divEle);
    printJS({
      printable: divEle.innerHTML,
      type: "raw-html"
    });
  }

  addGoods() {
    this.orders = [...this.orders, {}];
    console.log(this.orders);
  }
}
