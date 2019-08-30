import { RxJsonSchema } from "rxdb";
const dictionarySchema: RxJsonSchema = {
  title: "dictionary schema",
  description: "describes a simple dictionary",
  version: 0,
  keyCompression: false,
  type: "object",
  properties: {
    id: {
      type: "string",
      default: ""
    },
    value: {
      type: "string",
      default: ""
    },
    label: {
      type: "string",
      default: ""
    },
    type: {
      type: "string",
      default: ""
    },
    description: {
      type: "string",
      default: ""
    },
    sort: {
      type: "number",
      default: 0
    },
    createBy: {
      type: "string",
      default: "admin"
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
    remarks: {
      type: "string",
      default: ""
    },
    delFlag: {
      type: "number",
      default: 0
    }
  }
};
export { dictionarySchema };
