const STATUS_BY_MESSAGE = new Map([
  ["Product was not found", 404],
  ["Invalid product data.", 400],
  ["Product name is required.", 400],
  ["Price must be a non-negative number.", 400],
  ["Stock must be a non-negative integer.", 400],
]);

class ErrorMiddleware {
  static handle(error, req, res, next) {
    console.error(error);

    const statusCode =
      error.statusCode || STATUS_BY_MESSAGE.get(error.message) || 500;

    return res.status(statusCode).json({
      message: error.message || "Internal server error",
    });
  }
}

export default ErrorMiddleware;
