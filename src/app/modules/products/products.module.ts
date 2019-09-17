import { PipesModule } from "./../../pipes/pipes.module";
import { ProductsRoutingModule } from "./products-routing.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProductsComponent } from "./products.component";
import { NgZorroAntdModule } from "ng-zorro-antd";

@NgModule({
  declarations: [ProductsComponent],
  imports: [CommonModule, ProductsRoutingModule, PipesModule, NgZorroAntdModule]
})
export class ProductsModule {}
