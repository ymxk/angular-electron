import { DictionariesRoutingModule } from "./dictionaries-routing.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DictionariesComponent } from "./dictionaries.component";
import { PipesModule } from "../../pipes/pipes.module";
import { ComponentsModule } from "../../components/components.module";
import { NgZorroAntdModule } from "ng-zorro-antd";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [DictionariesComponent],
  imports: [
    FormsModule,
    CommonModule,
    DictionariesRoutingModule,
    PipesModule,
    ComponentsModule,
    NgZorroAntdModule
  ]
})
export class DictionariesModule {}
