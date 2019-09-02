import { DatabaseService } from "./../../../services/database.service";
import { AddDictionaryValidator } from "./add-dictionary-validtor";
import { Component, AfterViewInit, Inject, Input } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { RxDictionaryDocument } from "../../../services/dictionary.service";
import { NzModalRef } from "ng-zorro-antd";
/**
 */
@Component({
  selector: "add-dictionary",
  styleUrls: ["add-dictionary.component.scss"],
  templateUrl: "add-dictionary.component.html"
})
export class AddDictionaryComponent extends AddDictionaryValidator
  implements AfterViewInit {
  ngAfterViewInit() {}
  dictionary: any = {};
  @Input() dic: RxDictionaryDocument;
  constructor(
    private modal: NzModalRef,
    private dbService: DatabaseService,
    fb: FormBuilder
  ) {
    super(fb);
    this.createFromGroup();
  }

  ngOnInit() {
    this.dictionary = this.dic ? this.dic.toJSON() : {};
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
