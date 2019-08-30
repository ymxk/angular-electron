import { TableRoutingModule } from "./table-http-example-routing.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TableHttpExample } from "./table-http-example";

import { MaterialModule } from "../material.module";

@NgModule({
  declarations: [TableHttpExample],
  imports: [CommonModule, MaterialModule, TableRoutingModule]
})
export class TableHttpExampleModule {}
