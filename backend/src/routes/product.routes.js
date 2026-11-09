import { Router } from "express";

class ProductRoutes {
  constructor(ProductController) {
    this.router = Router();
    this.productController = ProductController;

    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post("/", this.productController.create);
    this.router.get("/", this.productController.findAll);
    this.router.get("/:id", this.productController.findById);
    this.router.put("/:id", this.productController.update);
    this.router.delete("/:id", this.productController.delete);
  }

  getRouter() {
    return this.router;
  }
}

export default ProductRoutes;
