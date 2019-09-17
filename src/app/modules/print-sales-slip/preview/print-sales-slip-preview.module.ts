import { ReactiveFormsModule } from "@angular/forms";
import { PrintSalesSlipPreviewRoutingModule } from "./print-sales-slip-preview-routing.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { NgZorroAntdModule } from "ng-zorro-antd";
import { PrintSalesSlipPreviewComponent } from "./print-sales-slip-preview.component";

@NgModule({
  declarations: [PrintSalesSlipPreviewComponent],
  imports: [
    CommonModule,
    PrintSalesSlipPreviewRoutingModule,
    ReactiveFormsModule,
    NgZorroAntdModule
  ]
})
export class PrintSalesSlipPreviewModule {}
