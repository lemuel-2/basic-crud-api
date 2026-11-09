import db from "./database.js";

import ProductRepository from "../repository/product.repository.js";
import ProductService from "../services/product.service.js";
import ProductController from "../controller/product.controller.js";
import ProductRoutes from "../routes/product.routes.js";

const productRepository = new ProductRepository(db);
const productService = new ProductService(productRepository);
const productController = new ProductController(productService);
const productRoutes = new ProductRoutes(productController);

export { productRepository, productService, productController, productRoutes };
