import "dotenv/config"

import Database from "better-sqlite3";
import path from "node:path";

const databasePath = path.resolve(
  process.cwd(),
  process.env.DATABASE_PATH || "database.sqlite"
);

const db = new Database(databasePath);

db.pragma("foreign_keys = ON");

export default db;