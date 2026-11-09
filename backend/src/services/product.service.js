import ValidateError from "../errors/validation.error.js";
import NotFoundError from "../errors/not-found.error.js";

class ProductService {
  constructor(ProductRepository) {
    this.productRepository = ProductRepository;
  }

  create(product) {
    this.validateProduct(product);
    return this.productRepository.create(product);
  }

  findAll() {
    return this.productRepository.findAll();
  }

  findById(id) {
    const product = this.productRepository.findById(id);
    if (!product) throw new NotFoundError("Product was not found");
    return product;
  }

  update(id, product) {
    this.validateProduct(product);
    this.findById(id);

    return this.productRepository.update(id, product);
  }

  delete(id) {
    this.findById(id);
    return this.productRepository.delete(id);
  }

  validateProduct(product) {
    if (
      product === null ||
      typeof product !== "object" ||
      Array.isArray(product)
    ) {
      throw new ValidateError("Invalid product data.");
    }

    if (typeof product.name !== "string" || product.name.trim() === "") {
      throw new ValidateError("Product name is required.");
    }

    if (
      typeof product.price !== "number" ||
      !Number.isFinite(product.price) ||
      product.price < 0
    ) {
      throw new ValidateError("Price must be a non-negative number.");
    }

    if (!Number.isInteger(product.stock) || product.stock < 0) {
      throw new ValidateError("Stock must be a non-negative integer.");
    }
  }
}

export default ProductService;
