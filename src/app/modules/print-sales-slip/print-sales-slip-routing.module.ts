import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { PrintSalesSlipComponent } from "./print-sales-slip.component";

const routes: Routes = [
  {
    path: "print-sales-slip",
    component: PrintSalesSlipComponent
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrintSalesSlipRoutingModule {}
