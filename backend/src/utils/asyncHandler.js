// This function handles the api promises and tryCatch
// dont have to try catch evertime when creating controllers function

// asyncHandler() takes async function and dont have to pass tryCatch
// useCase below
// const createUser = asyncHandler(async (req, res, next) => {});

const asyncHandler = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (err) {
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || "Something went wrong!",
    });
  }
};

export default asyncHandler;
