import { AddDictionaryComponent } from "./add-dictionary/add-dictionary.component";
import { Component, AfterViewInit } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { DatabaseService } from "../../services/database.service";
import { RxDictionaryDocument } from "../../services/dictionary.service";
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { NzModalService } from "ng-zorro-antd";
import { Pageable } from "../../model/pageable";
/**
 */
@Component({
  selector: "dictionaries",
  styleUrls: ["dictionaries.component.scss"],
  templateUrl: "dictionaries.component.html",
  providers: [DatabaseService]
})
export class DictionariesComponent implements AfterViewInit {
  dictionaries: Observable<RxDictionaryDocument[]>;
  validateForm: FormGroup;
  controlArray: any[] = [];
  isCollapse = true;
  loading = true;
  pageable: Pageable = new Pageable();
  params = {
    label: "",
    value: "",
    description: "",
    type: ""
  };
  toggleCollapse(): void {
    this.isCollapse = !this.isCollapse;
  }

  resetForm(): void {
    this.validateForm.reset();
  }
  constructor(
    private dbService: DatabaseService,
    private modalService: NzModalService
  ) {}

  goAdd() {
    this.modalService.create({
      nzTitle: "新增",
      nzContent: AddDictionaryComponent
    });
    return false;
  }

  onAddBy(dic: RxDictionaryDocument) {
    this.modalService.create({
      nzTitle: "新增",
      nzContent: AddDictionaryComponent,
      nzComponentParams: { dic: dic, addExist: true }
    });
    return false;
  }

  goUpdate(dic: RxDictionaryDocument) {
    console.log("goUpdate", dic);
    this.modalService.create({
      nzTitle: "更新",
      nzContent: AddDictionaryComponent,
      nzComponentParams: { dic: dic }
    });
    return false;
  }

  onRemoveConfirm(doc: RxDictionaryDocument) {
    this.modalService.confirm({
      nzTitle: "提示",
      nzContent: `<b style="color: red;">确认删除此数据</b>`,
      nzOkType: "danger",
      nzOnOk: () => doc.remove()
    });
  }

  ngAfterViewInit() {
    this.onSearch(true);
  }

  onSearch(
    reset: boolean = false,
    pageable: Pageable = this.pageable,
    sort: any = { createTime: "desc" }
  ) {
    this.loading = true;
    if (reset) this.pageable.pageIndex = 1;
    const dic = this.dbService.db.dictionary;
    dic
      .find()
      .exec()
      .then(data => (pageable.total = data.length));
    this.dictionaries = dic
      .find({
        label: { $regex: `${this.params.label}` },
        value: { $regex: `${this.params.value}` },
        description: { $regex: `${this.params.description}` },
        type: { $regex: `${this.params.type}` }
      })
      .sort(sort)
      .skip(pageable.skip())
      .limit(pageable.pageSize)
      .$.pipe(tap(() => (this.loading = false)));
    return false;
  }
}
