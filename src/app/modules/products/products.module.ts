import { PipesModule } from "./../../pipes/pipes.module";
import { ProductsRoutingModule } from "./products-routing.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProductsComponent } from "./products.component";

import { MaterialModule } from "../../material.module";
import { NgZorroAntdModule } from "ng-zorro-antd";

@NgModule({
  declarations: [ProductsComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ProductsRoutingModule,
    PipesModule,
    NgZorroAntdModule
  ]
})
export class ProductsModule {}
