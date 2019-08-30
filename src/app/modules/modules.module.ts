import { NgModule } from "@angular/core";
import { DictionariesModule } from "./dictionaries/dictionaries.module";
import { AddDictionaryModule } from "./dictionaries/add-dictionary/add-dictionary.module";
import { ProductsModule } from "./products/products.module";

@NgModule({
  exports: [DictionariesModule, AddDictionaryModule, ProductsModule]
})
export class ModulesModule {}
