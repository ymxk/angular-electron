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
      value: new FormControl("", [
        Validators.required,
        Validators.maxLength(50)
      ]),
      label: new FormControl("", [Validators.maxLength(50)]),
      type: new FormControl("", [Validators.maxLength(50)]),
      description: new FormControl("", [Validators.maxLength(50)]),
      sort: new FormControl(0, [Validators.min(0)]),
      remarks: new FormControl("", [Validators.maxLength(50)])
    });
  }
  get id() {
    return this.applyForm.get("id");
  }
  get value() {
    return this.applyForm.get("value");
  }
  get label() {
    return this.applyForm.get("label");
  }
  get type() {
    return this.applyForm.get("type");
  }
  get description() {
    return this.applyForm.get("description");
  }
  get sort() {
    return this.applyForm.get("sort");
  }
  get remarks() {
    return this.applyForm.get("remarks");
  }
  get createTime() {
    return this.applyForm.get("createTime");
  }
  get lastUpdateTime() {
    return this.applyForm.get("lastUpdateTime");
  }
}
