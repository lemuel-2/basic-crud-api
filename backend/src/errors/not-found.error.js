import AppError from "./app.error.js";

class NotFoundError extends AppError {
  constructor(message) {
    super(message, 404);
  }
}

export default NotFoundError;
