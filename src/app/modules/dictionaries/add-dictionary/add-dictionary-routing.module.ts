import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { AddDictionaryComponent } from "./add-dictionary.component";

const routes: Routes = [
  {
    path: "add-dictionary",
    component: AddDictionaryComponent
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddDictionaryRoutingModule {}
