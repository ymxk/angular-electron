import { RxJsonSchema } from "rxdb";
const heroSchema: RxJsonSchema = {
  title: "hero schema",
  description: "describes a simple hero",
  version: 0,
  keyCompression: false,
  type: "object",
  properties: {
    name: {
      type: "string",
      primary: true,
      default: ""
    },
    color: {
      type: "string",
      default: ""
    },
    maxHP: {
      type: "number",
      minimum: 0,
      maximum: 1000
    },
    hp: {
      type: "number",
      minimum: 0,
      maximum: 100,
      default: 100
    },
    team: {
      description: "color of the team this hero belongs to",
      type: "string"
    }
  },
  required: ["color", "hp", "maxHP"]
};

export { heroSchema };
