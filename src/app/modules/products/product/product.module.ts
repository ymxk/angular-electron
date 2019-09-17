import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { ProductRoutingModule } from "./product-routing.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ProductComponent } from "./product.component";
import { NgZorroAntdModule } from "ng-zorro-antd";
import { PipesModule } from "../../../pipes/pipes.module";

@NgModule({
  declarations: [ProductComponent],
  imports: [
    FormsModule,
    CommonModule,
    ProductRoutingModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    PipesModule
  ]
})
export class ProductModule {}
