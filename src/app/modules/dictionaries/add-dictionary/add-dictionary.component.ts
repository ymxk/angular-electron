import { DatabaseService } from "./../../../services/database.service";
import { AddDictionaryValidator } from "./add-dictionary-validtor";
import { Component, AfterViewInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormBuilder } from "@angular/forms";
import { RxDictionaryDocument } from "../../../services/dictionary.service";
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
  dictionary: any;
  constructor(
    public dialogRef: MatDialogRef<AddDictionaryComponent>,
    private dbService: DatabaseService,
    fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public dicDoc: RxDictionaryDocument
  ) {
    super(fb);
    this.createFromGroup();
    this.dictionary = dicDoc ? dicDoc.toJSON() : {};
  }

  onSave() {
    console.log(this.applyForm.value);
    this.dbService.db.dictionary.insert(this.applyForm.value);
    this.dialogRef.close();
  }

  onUpdate() {
    this.dicDoc.update(this.dictionary);
    this.dialogRef.close();
  }
}
