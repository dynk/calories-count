const HttpStatus = require('http-status-codes');
const logger = require('./logger');
const errors = require('./errors');

function responseJson(res, data, code = HttpStatus.OK) {
  res.status(code);
  return res.json(data);
}

function responseErrorJson(res, methodName, error = {}, code = HttpStatus.INTERNAL_SERVER_ERROR) {

  if (error instanceof errors.PropertyRequiredError) {
    code = HttpStatus.PRECONDITION_FAILED;
  } else if (error instanceof RangeError){
    code = HttpStatus.PRECONDITION_FAILED;
  } else if (error instanceof errors.UnauthorizedError){
    code = HttpStatus.UNAUTHORIZED;
  }
  res.status(error.httpCode || code);
  logger.error(methodName, error);
  return res.json({
    error: error.message || error.toString()
  });
}


module.exports = exports = {
  responseJson,
  responseErrorJson
};
