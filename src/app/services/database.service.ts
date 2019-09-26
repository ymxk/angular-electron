import { Injectable, ChangeDetectorRef } from "@angular/core";

// import typings
import { RxMyDatabase, RxDbCollections } from "./RxDB.d";

/**
 * custom build
 */
import RxDB from "rxdb/plugins/core";

// import modules
import RxDBSchemaCheckModule from "rxdb/plugins/schema-check";
import RxDBErrorMessagesModule from "rxdb/plugins/error-messages";

if (false) {
  // in dev-mode we show full error-messages
  RxDB.plugin(RxDBErrorMessagesModule);

  // schema-checks should be used in dev-mode only
  RxDB.plugin(RxDBSchemaCheckModule);
}

import RxDBValidateModule from "rxdb/plugins/validate";
RxDB.plugin(RxDBValidateModule);

import RxDBUpdateModule from "rxdb/plugins/update";
RxDB.plugin(RxDBUpdateModule);

import RxDBLeaderElectionModule from "rxdb/plugins/leader-election";
RxDB.plugin(RxDBLeaderElectionModule);

import RxDBReplicationModule from "rxdb/plugins/replication";
RxDB.plugin(RxDBReplicationModule);
// always needed for replication with the node-server
import * as PouchdbAdapterHttp from "pouchdb-adapter-http";
RxDB.plugin(PouchdbAdapterHttp);

import JsonDumpPlugin from "rxdb/plugins/json-dump";
RxDB.plugin(JsonDumpPlugin);

import * as PouchdbAdapterIdb from "pouchdb-adapter-idb";
import { storesCollections } from "./stores-collections";
import { RxDictionaryDocument } from "./dictionary.service";
RxDB.plugin(PouchdbAdapterIdb);
const uuidv5 = require("uuid/v5");
const useAdapter = "idb";

console.log("hostname: " + window.location.hostname);
const syncURL =
  "https://momentebeadyingrallyporn:7ea3381a75ffd23e30f3ac3337795a476771e65d@29687c30-0299-4d0d-b688-ab757ed76402-bluemix.cloudantnosqldb.appdomain.cloud";
// const syncURL = "http://127.0.0.1:5984";

let doSync = true;
if (window.location.hash == "#nosync") doSync = false;

/**
 * creates the database
 */
async function _create(): Promise<RxMyDatabase> {
  console.log("DatabaseService: creating database..");
  const db = await RxDB.create<RxDbCollections>({
    name: "erpdb",
    adapter: useAdapter,
    queryChangeDetection: true
    // password: 'myLongAndStupidPassword' // no password needed
  });
  console.log("DatabaseService: created database");
  (window as any)["db"] = db; // write to window for debugging

  // show leadership in title
  db.waitForLeadership().then(() => {
    console.log("isLeader now");
    document.title = "♛ " + document.title;
  });

  // create collections
  console.log("DatabaseService: create collections");
  await Promise.all(storesCollections.map(colData => db.collection(colData)));

  db.collections.dictionary.preInsert(function(
    this: RxDictionaryDocument,
    docData,
    doc
  ) {
    docData.id = uuidv5("dictionary", uuidv5.DNS);
    docData.createTime = Date.now();
    docData.lastUpdateTime = Date.now();
  },
  false);

  // sync with server
  // console.log(`DatabaseService: sync ${syncURL}/erpdb/"`);
  // const replicationState = await db.dictionary.sync({
  //   remote: `${syncURL}`
  // });
  // replicationState.change$.subscribe(change => console.log("change", change));
  // replicationState.docs$.subscribe(docData => console.log("docs", docData));
  // replicationState.denied$.subscribe(docData => console.log("denied", docData));
  // replicationState.active$.subscribe(active => console.log("active", active));
  // replicationState.alive$.subscribe(alive => console.log("alive", alive));
  // replicationState.complete$.subscribe(completed =>
  //   console.log("complete", completed)
  // );
  // replicationState.error$.subscribe(error => console.log("error", error));

  return db;
}

let DB_INSTANCE: RxMyDatabase;

/**
 * https://momentebeadyingrallyporn:7ea3381a75ffd23e30f3ac3337795a476771e65d@29687c30-0299-4d0d-b688-ab757ed76402-bluemix.cloudantnosqldb.appdomain.cloud/erpdb
 * This is run via APP_INITIALIZER in app.module.ts
 * to ensure the database exists before the angular-app starts up
 */
export async function initDatabase() {
  console.log("initDatabase()");
  DB_INSTANCE = await _create();
}

@Injectable({
  providedIn: "root"
})
export class DatabaseService {
  get db(): RxMyDatabase {
    return DB_INSTANCE;
  }
}
