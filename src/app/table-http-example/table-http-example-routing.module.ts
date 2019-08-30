import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { TableHttpExample } from "./table-http-example";

const routes: Routes = [
  {
    path: "table-http-example",
    component: TableHttpExample
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TableRoutingModule {}
