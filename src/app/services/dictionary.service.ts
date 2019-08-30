import { RxDocument, RxCollection } from "rxdb";
import { DictionaryType } from "../model/dictionary-type";

// ORM methods
type RxDictionaryDocMethods = {
  hpPercent(): number;
};

export type RxDictionaryDocument = RxDocument<
  DictionaryType,
  RxDictionaryDocMethods
>;

export type RxDictionaryCollection = RxCollection<
  DictionaryType,
  RxDictionaryDocMethods,
  {}
>;
