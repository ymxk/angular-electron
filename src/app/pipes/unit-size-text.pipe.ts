import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "unitSizeText"
})
export class UnitSizeTextPipe implements PipeTransform {
  datas = ["贷", "杯", "只"];
  transform(v: number): string {
    return this.datas[v];
  }
}
