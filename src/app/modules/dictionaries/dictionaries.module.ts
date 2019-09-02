import { DictionariesRoutingModule } from "./dictionaries-routing.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DictionariesComponent } from "./dictionaries.component";

import { MaterialModule } from "../../material.module";
import { PipesModule } from "../../pipes/pipes.module";
import { ComponentsModule } from "../../components/components.module";
import { NgZorroAntdModule } from "ng-zorro-antd";

@NgModule({
  declarations: [DictionariesComponent],
  imports: [
    CommonModule,
    MaterialModule,
    DictionariesRoutingModule,
    PipesModule,
    ComponentsModule,
    NgZorroAntdModule
  ]
})
export class DictionariesModule {}
