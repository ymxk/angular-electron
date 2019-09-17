export class Pageable {
  total: number = 0;
  pageIndex: number = 1;
  pageSize: number = 2;

  skip() {
    return (this.pageIndex - 1) * this.pageSize;
  }
}
