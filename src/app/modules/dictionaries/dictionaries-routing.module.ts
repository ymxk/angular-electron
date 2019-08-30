import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { DictionariesComponent } from "./dictionaries.component";

const routes: Routes = [
  {
    path: "dictionaries",
    component: DictionariesComponent
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DictionariesRoutingModule {}
