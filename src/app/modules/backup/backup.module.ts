import { ReactiveFormsModule } from "@angular/forms";
import { BackupRoutingModule } from "./backup-routing.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BackupComponent } from "./backup.component";

import { NgZorroAntdModule } from "ng-zorro-antd";

@NgModule({
  declarations: [BackupComponent],
  imports: [
    CommonModule,
    BackupRoutingModule,
    ReactiveFormsModule,
    NgZorroAntdModule
  ]
})
export class BackupModule {}
