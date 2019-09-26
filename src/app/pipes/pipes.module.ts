import { DigitUppercasePipe } from "./digit-uppercase.pipe";
import { TotalAuxQtyPipe } from "./total-aux-qty.pipe";
import { DatabaseService } from "./../services/database.service";
import { NgModule } from "@angular/core";
import { AsyncNoZonePipe } from "./async-no-zone.pipe";
import { UnitSizeTextPipe } from "./unit-size-text.pipe";
import { DicPipe } from "./dic.pipe";
import { DicByPipe } from "./dic-by.pipe";
import { TotalQtyPipe } from "./total-qty.pipe";
import { SaleSlipAmountPipe } from "./sales-slip-amount.pipe";
import { SaleSlipSubAmountPipe } from "./sales-slip-subamount.pipe";
import { PrettyPrintPipe } from "./pretty-print.pipe";
import { IsDefaultPipe } from "./is-default.pipe";
@NgModule({
  declarations: [
    AsyncNoZonePipe,
    UnitSizeTextPipe,
    DicPipe,
    DicByPipe,
    TotalQtyPipe,
    TotalAuxQtyPipe,
    SaleSlipAmountPipe,
    SaleSlipSubAmountPipe,
    DigitUppercasePipe,
    PrettyPrintPipe,
    IsDefaultPipe
  ],
  providers: [DatabaseService],
  exports: [
    AsyncNoZonePipe,
    UnitSizeTextPipe,
    DicPipe,
    DicByPipe,
    TotalQtyPipe,
    TotalAuxQtyPipe,
    SaleSlipAmountPipe,
    SaleSlipSubAmountPipe,
    DigitUppercasePipe,
    PrettyPrintPipe,
    IsDefaultPipe
  ]
})
export class PipesModule {}
