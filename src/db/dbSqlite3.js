import sqlite3 from "sqlite3";

let database = null;

class DBSqlite3 {
  constructor() {
    if (!database) {
      database = new sqlite3.Database(
        "db.sqlite3",
        sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE
      );
    }
    return database;
  }
}

export default DBSqlite3;
