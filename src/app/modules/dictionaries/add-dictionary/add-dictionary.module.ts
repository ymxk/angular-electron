import { ReactiveFormsModule } from "@angular/forms";
import { AddDictionaryRoutingModule } from "./add-dictionary-routing.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AddDictionaryComponent } from "./add-dictionary.component";

import { MaterialModule } from "../../../material.module";
import { NgZorroAntdModule } from "ng-zorro-antd";

@NgModule({
  declarations: [AddDictionaryComponent],
  imports: [
    CommonModule,
    MaterialModule,
    AddDictionaryRoutingModule,
    ReactiveFormsModule,
    NgZorroAntdModule
  ]
})
export class AddDictionaryModule {}
