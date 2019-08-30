import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { ProductComponent } from "./product.component";

const routes: Routes = [
  {
    path: "product",
    component: ProductComponent
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddDictionaryRoutingModule {}
