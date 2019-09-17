import { PipesModule } from "./../../pipes/pipes.module";
import { PrintSalesSlipComponent } from "./print-sales-slip.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { PrintSalesSlipRoutingModule } from "./print-sales-slip-routing.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { NgZorroAntdModule } from "ng-zorro-antd";

@NgModule({
  declarations: [PrintSalesSlipComponent],
  imports: [
    FormsModule,
    CommonModule,
    PipesModule,
    PrintSalesSlipRoutingModule,
    ReactiveFormsModule,
    NgZorroAntdModule
  ]
})
export class PrintSalesSlipModule {}
