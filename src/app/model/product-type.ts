export type ProductType = {
  id: string;
  upc: string; //商品编号 (通用产品代码) Universal Product Code
  productName: string; //存货名称
  productDescription: string; //商品描述
  quantityPerUnit: string; //辅助数量（包装数量）
  unitSize: string; //规格
  unitPrice: string; //单价
  units: string; //单位
  exp: number; //生产日期  expiring date
  createBy: string;
  createTime: number;
  lastUpdateBy: string;
  lastUpdateTime: number;
  delFlag: number;
};
