import sqlite3 from 'sqlite3'

let database: sqlite3.Database | null = null

function getInstance(): sqlite3.Database {
  if (!database) {
    database = new sqlite3.Database('db.sqlite3', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE)
  }

  return database
}
export default getInstance
