import sqlite3 from "sqlite3";

let database = null;

class DBCommon {
  constructor() {
    if (!database) {
      database = new sqlite3.Database(
        "db.sqlite3",
        sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE
      );
    }
    return database;
  }

  close() {
    if (database) {
      database.close();
    }
  }
}

export default DBCommon;
