import { PrintSalesSlipPreviewModule } from "./print-sales-slip/preview/print-sales-slip-preview.module";
import { PrintSalesSlipModule } from "./print-sales-slip/print-sales-slip.module";
import { BackupModule } from "./backup/backup.module";
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
    ProductModule,
    BackupModule,
    PrintSalesSlipModule,
    PrintSalesSlipPreviewModule
  ]
})
export class ModulesModule {}
