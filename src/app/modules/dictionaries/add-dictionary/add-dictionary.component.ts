import { DatabaseService } from "./../../../services/database.service";
import { AddDictionaryValidator } from "./add-dictionary-validtor";
import { Component, AfterViewInit, Inject, Input } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { RxDictionaryDocument } from "../../../services/dictionary.service";
import { NzModalRef } from "ng-zorro-antd";
import { PouchDBService } from "../../../services/pouch-db";
const uuidv4 = require("uuid/v4");
/**
 */
@Component({
  selector: "add-dictionary",
  styleUrls: ["add-dictionary.component.scss"],
  templateUrl: "add-dictionary.component.html",
  providers: [PouchDBService]
})
export class AddDictionaryComponent extends AddDictionaryValidator
  implements AfterViewInit {
  ngAfterViewInit() {}
  dictionary: any = {};
  @Input() dic: RxDictionaryDocument;
  @Input() addExist: boolean;
  constructor(
    private modal: NzModalRef,
    private dbService: DatabaseService,
    private pouchDBService: PouchDBService,
    fb: FormBuilder
  ) {
    super(fb);
    this.createFromGroup();
  }

  ngOnInit() {
    if (this.addExist) {
      this.dictionary = this.dic ? { type: this.dic.toJSON().type } : {};
    } else {
      this.dictionary = this.dic ? this.dic.toJSON() : {};
    }
  }

  onSave() {
    this.dbService.db.dictionary.insert(this.applyForm.value);
    this.destroyModal();
  }

  destroyModal(): void {
    this.modal.destroy();
  }

  onUpdate() {
    this.dic.update(this.dictionary);
    this.destroyModal();
  }
}
