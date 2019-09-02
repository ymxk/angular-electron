import { ReactiveFormsModule } from "@angular/forms";
import { ProductRoutingModule } from "./product-routing.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MaterialModule } from "../../../material.module";
import { ProductComponent } from "./product.component";

@NgModule({
  declarations: [ProductComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ProductRoutingModule,
    ReactiveFormsModule
  ]
})
export class ProductModule {}
