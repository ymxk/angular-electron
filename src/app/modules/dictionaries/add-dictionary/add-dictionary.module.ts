import { ReactiveFormsModule } from '@angular/forms';
import { AddDictionaryRoutingModule } from "./add-dictionary-routing.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AddDictionaryComponent } from "./add-dictionary.component";

import { MaterialModule } from "../../../material.module";

@NgModule({
  declarations: [AddDictionaryComponent],
  imports: [CommonModule, MaterialModule, AddDictionaryRoutingModule,ReactiveFormsModule]
})
export class AddDictionaryModule {}
