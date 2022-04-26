const fs = require("fs/promises");

const generateError = (message, status = 500) => {
  const error = new Error(message);
  error.httpStatus = status;
  return error;
};

module.exports = {
  generateError,
};
