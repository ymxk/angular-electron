import { map } from "rxjs/operators";
import { DatabaseService } from "../services/database.service";
import { Pipe, PipeTransform } from "@angular/core";
import { Observable, of } from "rxjs";
import * as numeral from "numeral";
import * as jspath from "jspath";

@Pipe({
  name: "totalQty"
})
export class TotalQtyPipe implements PipeTransform {
  transform(v: any): Observable<any> {
    if (!v) return of(0.0);
    if (v && v.length == 0) return of(0.0);
    return of(
      jspath
        .apply(".quantity", v)
        .reduce((a, b) => numeral(a).add(b), 0)
        .value()
    );
  }
}
