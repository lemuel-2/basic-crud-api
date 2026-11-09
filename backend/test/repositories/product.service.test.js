import { test } from "node:test";
import assert from "node:assert/strict";

import ProductService from "../../src/services/product.service.js";
import ValidateError from "../../src/errors/validation.error.js";
import NotFoundError from "../../src/errors/not-found.error.js";

test("should reject a negative number", () => {
  const repository = {
    create() {},
  };

  const service = new ProductService(repository);

  assert.throws(
    () =>
      service.create({
        name: "Keyboard",
        price: -100,
        stock: 10,
      }),
    ValidateError,
  );
});

test("should not throw when a product does not exist", () => {
  const repository = {
    findById: () => undefined,
  };

  const service = new ProductService(repository);

  assert.throws(() => service.findById(999), NotFoundError);
});
