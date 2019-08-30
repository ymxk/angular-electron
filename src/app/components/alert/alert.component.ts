import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Inject } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { Component } from "@angular/core";
import { AlterData } from "../../model/alert-data";

@Component({
  selector: "alert",
  styleUrls: ["alert.component.scss"],
  templateUrl: "alert.component.html"
})
export class AlertComponent {
  constructor(
    public dialogRef: MatDialogRef<AlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AlterData
  ) {}

  onOk(): void {
    this.dialogRef.close();
  }
}
