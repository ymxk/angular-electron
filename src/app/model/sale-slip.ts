export class SaleSlip {
  createTime: string | null; //录单日期
  serialNum: string | null; //单据编号
  shippingWh: string | null; //发货仓库
  purchaser: string | null; //购买单位
  summary: string | null; //摘要
  handler: string | null; //经手人
  accountsReceivable: string | null; //收款账户
  receivablesAmount: string | null; //收款金额
  total: string | null; //合计
  sender: string | null; //发货
  deliveryPerson: string | null; //送货
  receiver: string | null; //送货
  preparedBy: string | null; //制单人
  reviewer: string | null; //复核人
  companyAddress: string | null; //公司地址
  telephone: string | null; //联系电话
}
