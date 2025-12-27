// Better way to handler API error response
// ApiError is our custom class that extends and use some fields like message

class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong!",
    error = [],
    stack
  ) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.error = error;
    this.success = false;
    this.data = null;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;

// Normal error handling
// throw new Error("Error creating user!");

// This class make it easier
// throw new ApiError(400, "Error creating user");
