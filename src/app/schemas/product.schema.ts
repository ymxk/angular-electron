import { RxJsonSchema } from "rxdb";
const productSchema: RxJsonSchema = {
  title: "product schema",
  description: "describes a simple product",
  version: 0,
  keyCompression: false,
  type: "object",
  properties: {
    productId: {
      type: "string",
      default: ""
    },
    upc: {
      type: "string",
      default: ""
    },
    productName: {
      type: "string",
      default: ""
    },
    productDescription: {
      type: "string",
      default: ""
    },
    quantityPerUnit: {
      type: "string",
      default: ""
    },
    unitSize: {
      type: "string",
      default: ""
    },
    unitPrice: {
      type: "string",
      default: ""
    },
    createTime: {
      type: "number",
      index: true
    },
    lastUpdateBy: {
      type: "string",
      default: "admin"
    },
    lastUpdateTime: {
      type: "number",
      index: true
    },
    delFlag: {
      type: "number",
      default: 0
    }
  }
};
export { productSchema };
