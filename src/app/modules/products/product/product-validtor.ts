import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Validators } from "@angular/forms";
import { FormGroup, FormControl } from "@angular/forms";

export class AddDictionaryValidator {
  applyForm: FormGroup;
  constructor(public fb: FormBuilder) {
    this.createFromGroup();
  }

  createFromGroup() {
    this.applyForm = this.fb.group({
      upc: new FormControl("", [Validators.required, Validators.maxLength(50)]),
      productName: new FormControl("", [
        Validators.required,
        Validators.maxLength(50)
      ]),
      productDescription: new FormControl("", [Validators.maxLength(50)]),
      quantityPerUnit: new FormControl(0, [
        Validators.required,
        Validators.min(0)
      ]),
      units: new FormControl(0, [Validators.required, Validators.min(0)]),
      exp: new FormControl(0, [Validators.required]),
      unitSize: new FormControl(0, [Validators.required, Validators.min(0)]),
      unitPrice: new FormControl(0, [Validators.required, Validators.min(0)])
    });
  }
  get upc() {
    return this.applyForm.get("upc");
  }
  get productName() {
    return this.applyForm.get("productName");
  }
  get productDescription() {
    return this.applyForm.get("productDescription");
  }
  get quantityPerUnit() {
    return this.applyForm.get("quantityPerUnit");
  }
  get unitSize() {
    return this.applyForm.get("unitSize");
  }
  get unitPrice() {
    return this.applyForm.get("unitPrice");
  }
  get exp() {
    return this.applyForm.get("exp");
  }
  get units() {
    return this.applyForm.get("units");
  }
}
