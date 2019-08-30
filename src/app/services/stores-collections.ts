import { RxHeroDocument } from "./hero.service";
import { heroSchema, dictionarySchema } from "../schemas/index";
import { productSchema } from "../schemas/product.schema";

const storesCollections = [
  {
    name: "hero",
    schema: heroSchema,
    methods: {},
    sync: true
  },
  {
    name: "dictionary",
    schema: dictionarySchema,
    methods: {},
    sync: true
  },
  {
    name: "product",
    schema: productSchema,
    methods: {},
    sync: true
  }
];

export { storesCollections };
