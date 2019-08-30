import { RxDocument, RxCollection } from "rxdb";
import { RxHeroDocumentType } from "../model/rx-hero-document-type";

// ORM methods
type RxHeroDocMethods = {
  hpPercent(): number;
};

export type RxHeroDocument = RxDocument<RxHeroDocumentType, RxHeroDocMethods>;

export type RxHeroCollection = RxCollection<
  RxHeroDocumentType,
  RxHeroDocMethods,
  {}
>;
