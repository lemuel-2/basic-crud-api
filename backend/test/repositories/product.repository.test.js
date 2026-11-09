import { test, beforeEach, after } from "node:test";
import assert from "node:assert";
import Database from "better-sqlite3";

import ProductRepository from "../../src/repository/product.repository.js";

let db;
let repository;

beforeEach(() => {
  db = new Database(":memory:");

  db.exec(`
    CREATE TABLE products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price REAL NOT NULL CHECK (price >= 0),
      stock INTEGER NOT NULL CHECK (stock >= 0),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  repository = new ProductRepository(db);
});

after(() => {
  db?.close();
});

test("should create and retrieve a product", () => {
  const product = repository.create({
    name: "Keyboard",
    price: "1500",
    stock: 10,
  });

  assert.equal(product.name, "Keyboard");
  assert.equal(product.price, 1500);
  assert.equal(product.stock, 10);
  assert.ok(product.id);
});

test("should return undefined for nonexisting product", () => {
  const product = repository.findById(999);

  assert.equal(product, undefined);
})
