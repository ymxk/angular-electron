import { NgModule } from "@angular/core";
import { DictionariesModule } from "./dictionaries/dictionaries.module";
import { AddDictionaryModule } from "./dictionaries/add-dictionary/add-dictionary.module";
import { ProductsModule } from "./products/products.module";
import { ProductModule } from "./products/product/product.module";

@NgModule({
  exports: [
    DictionariesModule,
    AddDictionaryModule,
    ProductsModule,
    ProductModule
  ]
})
export class ModulesModule {}
