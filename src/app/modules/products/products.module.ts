import { PipesModule } from "./../../pipes/pipes.module";
import { ProductsRoutingModule } from "./products-routing.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProductsComponent } from "./products.component";

import { MaterialModule } from "../../material.module";

@NgModule({
  declarations: [ProductsComponent],
  imports: [CommonModule, MaterialModule, ProductsRoutingModule, PipesModule]
})
export class ProductsModule {}
