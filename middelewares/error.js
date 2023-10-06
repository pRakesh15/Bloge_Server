class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this,this.constructor);
  }

}

export const errorMiddleware = (error, req, res, next) => {
  err.message = error.message || "Internal Server Error";
  err.statusCode = error.statusCode || 500;

  return res.status(error.statusCode).json({
    success: false,
    message: error.message,
  })
};

export default ErrorHandler;