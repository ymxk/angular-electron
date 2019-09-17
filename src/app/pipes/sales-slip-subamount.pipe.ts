import { map } from "rxjs/operators";
import { DatabaseService } from "../services/database.service";
import { Pipe, PipeTransform } from "@angular/core";
import { Observable, of } from "rxjs";
import * as numeral from "numeral";
import * as jspath from "jspath";

@Pipe({
  name: "saleSlipSubAmount"
})
export class SaleSlipSubAmountPipe implements PipeTransform {
  transform(v: any): Observable<any> {
    if (!v) return of(0.0);
    return of(
      numeral(v.unitPrice)
        .multiply(v.quantity)
        .value()
    );
  }
}
