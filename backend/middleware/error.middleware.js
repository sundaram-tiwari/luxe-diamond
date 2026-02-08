const { ZodError } = require("zod");

const errorHandler = (err, req, res, next) => {

  // Zod error handling
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      errors: err.issues.map((e) => ({
        field: e.path[0],
        message: e.message
      }))
    });
  }

  // Server Errors Handling
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
};

module.exports = errorHandler;
