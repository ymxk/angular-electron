import { map, reduce } from "rxjs/operators";
import { DatabaseService } from "../services/database.service";
import { Pipe, PipeTransform } from "@angular/core";
import { Observable, of } from "rxjs";
import * as numeral from "numeral";
import * as jspath from "jspath";

@Pipe({
  name: "totalAuxQty"
})
export class TotalAuxQtyPipe implements PipeTransform {
  transform(v: any): Observable<any> {
    if (!v) return of(0.0);
    if (v && v.length == 0) return of(0.0);
    return of(
      jspath
        .apply(".quantityPerUnit", v)
        .reduce((a, b) => numeral(a).add(b), 0)
        .value()
    );
  }
}
