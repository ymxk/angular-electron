import { DatabaseService } from "./../services/database.service";
import { Pipe, PipeTransform } from "@angular/core";
import { tap } from "rxjs/operators";
import { RxDictionaryDocument } from "../services/dictionary.service";
import { Observable } from "rxjs";

@Pipe({
  name: "dic"
})
export class DicPipe implements PipeTransform {
  constructor(private dbService: DatabaseService) {}
  transform(v: string): Observable<RxDictionaryDocument[]> {
    return this.dbService.db.dictionary.find({ type: v }).$.pipe();
  }
}
