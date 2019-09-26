import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "isDefault"
})
export class IsDefaultPipe implements PipeTransform {
  transform(v: boolean) {
    return v ? "是" : "否";
  }
}
