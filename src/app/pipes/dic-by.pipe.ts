import { map } from "rxjs/operators";
import { DatabaseService } from "../services/database.service";
import { Pipe, PipeTransform } from "@angular/core";
import { RxDictionaryDocument } from "../services/dictionary.service";
import { Observable } from "rxjs";

@Pipe({
  name: "dicBy"
})
export class DicByPipe implements PipeTransform {
  constructor(private dbService: DatabaseService) {}
  transform(v: string, i: string): Observable<any> {
    return this.dbService.db.dictionary
      .findOne({ type: v, value: i })
      .$.pipe(map(e => e["label"]));
  }
}
