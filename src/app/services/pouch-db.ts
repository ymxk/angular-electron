import { Injectable } from "@angular/core";
import { dburl, dbconf } from "./config";
import PouchDB from "pouchdb";
PouchDB.plugin(require("../relational-pouch/lib/index.js"));
PouchDB.plugin(require("pouchdb-find"));
function onSyncChange(info) {
  console.log("onSyncChange", info);
}
function onSyncPaused(err) {
  console.log("onSyncPaused", err);
}
function onSyncError(err) {
  console.log("onSyncError", err);
}

async function _create() {
  var db = new PouchDB("erpdb", { adapter: "idb" });
  db.setSchema([
    {
      singular: "dictionary",
      plural: "dictionaries"
    }
  ]);
  console.log(db);
  console.log(db.rel);
  db.rel.save("dictionary", { name: "Tim Cook", age: 56, career: "CEO" });
  console.log(`PouchDBService: sync ${dburl()}`);
//   db.replicate.to(dburl(), dbconf.syncOpts, onSyncError);
  db.replicate.to('http://127.0.0.1:5984/erpdb', dbconf.syncOpts, onSyncError);

  //   db.replicate
  //     .from(url)
  //     .on("complete", function(info) {
  //       db.sync(url, opts)
  //         .on("change", onSyncChange)
  //         .on("paused", onSyncPaused)
  //         .on("error", onSyncError);
  //     })
  //     .on("error", onSyncError);
  return db;
}

let DB_INSTANCE: PouchDB;

export async function initPouchDB(): Promise<PouchDB> {
  console.log("initPouchDB()");
  DB_INSTANCE = await _create();
}

@Injectable({
  providedIn: "root"
})
export class PouchDBService {
  get db(): PouchDB {
    return DB_INSTANCE;
  }
}
