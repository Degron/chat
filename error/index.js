// var path = require('path');
// var util = require('util');
// var http = require('http');

// // ошибки для выдачи посетителю
// function HttpError(status, message) {
//   Error.apply(this, arguments);
//   Error.captureStackTrace(this, HttpError);

//   this.status = status;
//   this.message = message || http.STATUS_CODES[status] || "Error";
// }

class HttpError extends Error {
  constructor(message) {
    super(message);
    this.message = message || http.STATUS_CODES[status] || "Error";
    this.name = 'HttpError';
    Error.apply(this, arguments);
  }
}

exports.HttpError = HttpError;