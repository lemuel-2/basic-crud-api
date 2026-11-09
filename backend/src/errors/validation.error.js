import AppError from "./app.error.js";

class ValidateError extends AppError {
  constructor(message) {
    super(message, 400)
  }
}

export default ValidateError; 
