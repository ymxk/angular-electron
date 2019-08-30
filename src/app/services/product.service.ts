import { RxDocument, RxCollection } from "rxdb";
import { ProductType } from "../model/product-type";

// ORM methods
type RxProductDocMethods = {
  hpPercent(): number;
};

export type RxProductDocument = RxDocument<ProductType, RxProductDocMethods>;

export type RxProductCollection = RxCollection<
  ProductType,
  RxProductDocMethods,
  {}
>;
