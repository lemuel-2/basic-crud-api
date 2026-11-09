import express from "express";

import ErrorMiddleware from "./middlewares/error.middleware.js";

class App {
  constructor(productRoutes) {
    this.app = express();
    this.productRoutes = productRoutes;

    this.initializeMiddleware();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  initializeMiddleware() {
    this.app.use(express.json());
  }

  initializeRoutes() {
    this.app.use("/api/products", this.productRoutes.getRouter());

    this.app.use((req, res) => {
      res.status(404).json({
        message: "Route not found.",
      });
    });
  }

  initializeErrorHandling() {
    this.app.use(ErrorMiddleware.handle);
  }

  getApp() {
    return this.app;
  }
}

export default App;
