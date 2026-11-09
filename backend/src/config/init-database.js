import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import db from "./database.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const schemaPath = path.resolve(__dirname, "../../database/schema.sql");

const schema = fs.readFileSync(schemaPath, "utf-8");

db.exec(schema);

console.log("Database initialize successfully.");

export default db;
