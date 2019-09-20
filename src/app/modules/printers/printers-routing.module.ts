import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { PrintersComponent } from "./printers.component";

const routes: Routes = [
  {
    path: "printers",
    component: PrintersComponent
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrintersRoutingModule {}
