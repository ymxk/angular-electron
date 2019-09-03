import { DatabaseService } from "./../services/database.service";
import { NgModule } from "@angular/core";
import AsyncNoZonePipe from "./async-no-zone.pipe";
import { UnitSizeTextPipe } from "./unit-size-text.pipe";
import { DicPipe } from "./dic.pipe";
@NgModule({
  declarations: [AsyncNoZonePipe, UnitSizeTextPipe, DicPipe],
  providers: [DatabaseService],
  exports: [AsyncNoZonePipe, UnitSizeTextPipe, DicPipe]
})
export class PipesModule {}
