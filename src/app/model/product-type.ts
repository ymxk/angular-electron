export type ProductType = {
  productId: string;
  upc: string; //商品编码 (通用产品代码) Universal Product Code
  productName: string; //商品名称
  productDescription: string; //商品描述
  quantityPerUnit: string; //辅助数量（包装数量）
  unitSize: string; //规格
  unitPrice: string; //单价
  createBy: string;
  createTime: number;
  lastUpdateBy: string;
  lastUpdateTime: number;
  delFlag: number;
};
