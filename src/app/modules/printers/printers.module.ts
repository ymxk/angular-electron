import { ReactiveFormsModule } from "@angular/forms";
import { PrintersRoutingModule } from "./printers-routing.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PrintersComponent } from "./printers.component";

import { NgZorroAntdModule } from "ng-zorro-antd";

@NgModule({
  declarations: [PrintersComponent],
  imports: [
    CommonModule,
    PrintersRoutingModule,
    ReactiveFormsModule,
    NgZorroAntdModule
  ]
})
export class PrintersModule {}
