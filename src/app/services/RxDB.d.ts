import { RxDatabase } from "rxdb";
import { RxHeroCollection } from "./hero.service";
import { RxDictionaryCollection } from "./dictionary.service";
import { RxProductCollection } from "./product.service";

export type RxDbCollections = {
  hero: RxHeroCollection;
  dictionary: RxDictionaryCollection;
  product: RxProductCollection;
};

export type RxMyDatabase = RxDatabase<RxDbCollections>;
