import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { PrintSalesSlipPreviewComponent } from "./print-sales-slip-preview.component";

const routes: Routes = [
  {
    path: "print-sales-slip-preview",
    component: PrintSalesSlipPreviewComponent
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrintSalesSlipPreviewRoutingModule {}
