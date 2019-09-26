import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { PrintersRoutingModule } from "./printers-routing.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PrintersComponent } from "./printers.component";

import { NgZorroAntdModule } from "ng-zorro-antd";
import { PipesModule } from "../../pipes/pipes.module";

@NgModule({
  declarations: [PrintersComponent],
  imports: [
    FormsModule,
    CommonModule,
    PrintersRoutingModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    PipesModule
  ]
})
export class PrintersModule {}
