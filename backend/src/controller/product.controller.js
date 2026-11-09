class ProductController {
  constructor(ProductService) {
    this.productService = ProductService;
  }

  create = (req, res, next) => {
    try {
      const product = this.productService.create(req.body);
      return res.status(201).json({
        message: "product created successfully",
        data: product,
      });
    } catch (error) {
      next(error);
    }
  };

  findAll = (req, res, next) => {
    try {
      const products = this.productService.findAll();

      return res.status(200).json({
        data: products,
      });
    } catch (error) {
      next(error);
    }
  };

  findById = (req, res, next) => {
    try {
      const id = Number(req.params.id);

      if (!Number.isInteger(id)) {
        return res.status(400).json({ message: "Invalid id" });
      }

      const product = this.productService.findById(id);

      return res.status(200).json({
        data: product,
      });
    } catch (error) {
      next(error);
    }
  };

  update = (req, res, next) => {
    try {
      const id = Number(req.params.id);

      if (!Number.isInteger(id)) {
        return res.status(400).json({ message: "Invalid id" });
      }

      const product = this.productService.update(id, req.body);

      return res.status(200).json({
        message: "Product updated successfully",
        data: product,
      });
    } catch (error) {
      next(error);
    }
  };

  delete = (req, res, next) => {
    try {
      const id = Number(req.params.id);

      if (!Number.isInteger(id)) {
        return res.status(400).json({ message: "Invalid id" });
      }

      this.productService.delete(id);
      return res.status(200).json({
        message: "Product deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  };
}

export default ProductController;
