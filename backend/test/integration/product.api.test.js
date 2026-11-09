import { test, beforeEach, after } from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import Database from "better-sqlite3";

import App from "../../src/app.js";
import ProductController from "../../src/controller/product.controller.js";
import ProductRoutes from "../../src/routes/product.routes.js";
import ProductRepository from "../../src/repository/product.repository.js";
import ProductService from "../../src/services/product.service.js";

let db;
let api;

const TEST_ROUTES = "/api/products";
const TEST_PRODUCT = { name: "Keyboard", price: 1500, stock: 10 };

const TEST_ROUTES_INVALID_ID = "/api/products/999";
const TEST_INVALID_PRODUCT = { name: "", price: -100, stock: -10 };

beforeEach(() => {
  db?.close();
  db = new Database(":memory:");

  db.exec(`
    CREATE TABLE products(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price REAL NOT NULL CHECK (price >= 0),
      stock INTEGER NOT NULL CHECK (stock >= 0),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  const repository = new ProductRepository(db);
  const service = new ProductService(repository);
  const controller = new ProductController(service);
  const routes = new ProductRoutes(controller);

  api = request(new App(routes).getApp());
});

after(() => {
  db?.close();
});

test("POST /api/products should create a product", async () => {
  const response = await api.post(TEST_ROUTES).send(TEST_PRODUCT);

  assert.equal(response.status, 201);
  assert.equal(response.body.data.name, "Keyboard");
});

test("GET /api/products should return products", async () => {
  await api.post(TEST_ROUTES).send(TEST_PRODUCT);

  const response = await api.get("/api/products");
  assert.equal(response.status, 200);
  assert.equal(response.body.data.length, 1);
});

test("GET /api/products/999 should return 404", async () => {
  const response = await api.get(TEST_ROUTES_INVALID_ID);
  assert.equal(response.status, 404);
});

test("POST should reject invalid product data", async () => {
  const response = await api.post(TEST_ROUTES).send(TEST_INVALID_PRODUCT);

  assert.equal(response.status, 400);
});
