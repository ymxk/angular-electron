import { NgModule } from "@angular/core";
import AsyncNoZonePipe from "./async-no-zone.pipe";
import { UnitSizeTextPipe } from "./unit-size-text.pipe";
@NgModule({
  declarations: [AsyncNoZonePipe, UnitSizeTextPipe],
  providers: [],
  exports: [AsyncNoZonePipe, UnitSizeTextPipe]
})
export class PipesModule {}
