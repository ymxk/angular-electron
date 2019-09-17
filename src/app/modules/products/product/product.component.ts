import { async } from "@angular/core/testing";
import { DatabaseService } from "../../../services/database.service";
import { AddProductValidator } from "./product-validtor";
import { Component, AfterViewInit, Inject, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { RxProductDocument } from "../../../services/product.service";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { switchMap, map } from "rxjs/operators";
import { of, Observable } from "rxjs";
const uuidv4 = require("uuid/v4");
/**
 */
@Component({
  selector: "product",
  styleUrls: ["product.component.scss"],
  templateUrl: "product.component.html"
})
export class ProductComponent extends AddProductValidator implements OnInit {
  product: any = {};
  public doc: RxProductDocument;
  constructor(
    private dbService: DatabaseService,
    fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    super(fb);
    this.createFromGroup();

    this.dbService.db.collections.product.preInsert(function(
      this: RxProductDocument,
      data,
      doc
    ) {
      data.id = uuidv4();
      data.createTime = Date.now();
      data.lastUpdateTime = Date.now();
      console.log(data);
    },
    false);
  }

  ngOnInit() {
    this.route.paramMap.subscribe(v => {
      this.dbService.db.product
        .findOne({
          id: v.get("id")
        })
        .$.subscribe(v => {
          if (v == null) return;
          this.doc = v;
          this.product = v.toJSON();
        });
    });
  }

  onSave() {
    let params = JSON.parse(JSON.stringify(this.product));
    params.exp = this.product.exp.getTime();
    this.dbService.db.product.insert(params);
    this.router.navigate(["/products"]);
  }

  onUpdate() {
    let params = JSON.parse(JSON.stringify(this.product));
    params.exp =
      typeof this.product.exp === "number"
        ? new Date(this.product.exp).getTime()
        : this.product.exp.getTime();
    this.doc.update(params);
    this.router.navigate(["/products"]);
  }
}
