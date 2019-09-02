import { DatabaseService } from "../../../services/database.service";
import { AddDictionaryValidator } from "./product-validtor";
import { Component, AfterViewInit, Inject } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { RxDictionaryDocument } from "../../../services/dictionary.service";
/**
 */
@Component({
  selector: "product",
  styleUrls: ["product.component.scss"],
  templateUrl: "product.component.html"
})
export class ProductComponent extends AddDictionaryValidator
  implements AfterViewInit {
  ngAfterViewInit() {}
  dictionary: any;
  public dicDoc: RxDictionaryDocument;
  constructor(private dbService: DatabaseService, fb: FormBuilder) {
    super(fb);
    this.createFromGroup();
    // this.dictionary = dicDoc ? dicDoc.toJSON() : {};
  }

  onSave() {
    console.log(this.applyForm.value);
    this.dbService.db.dictionary.insert(this.applyForm.value);
  }

  onUpdate() {
    this.dicDoc.update(this.dictionary);
  }
}
