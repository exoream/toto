class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
    this.statusCode = 404;
  }
}

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
    this.statusCode = 400;
  }
}

class DuplicateError extends Error {
  constructor(message) {
    super(message);
    this.name = "DuplicateError";
    this.statusCode = 409;
  }
}

class AuthenticationError extends Error {
  constructor(message) {
    super(message);
    this.name = "AuthenticationError";
    this.statusCode = 401;
  }
}

class UnauthorizedError extends Error {
  constructor(message) {
    super(message || "Unauthorized");
    this.name = "UnauthorizedError";
    this.statusCode = 401;
  }
}

class ErrorResponseJson {
  constructor(message) {
    this.status = false;
    this.message = message;
  }
}

class SuccessResponseJson {
  constructor(message) {
    this.status = true;
    this.message = message;
  }
}

class SuccessResponseJsonWithData {
  constructor(message, data = null) {
    this.status = true;
    this.message = message;
    if (data !== null) {
      this.data = data;
    }
  }
}

class SuccessResponseJsonWithPaginationAndCount {
  constructor(message, data, pagination, count) {
    this.status = true;
    this.message = message;
    this.data = data;
    this.pagination = pagination;
    this.count = count;
  }
}

function successWithPaginationAndCount(message, data, pagination, count) {
  return new SuccessResponseJsonWithPaginationAndCount(message, data, pagination, count);
}


function errorResponse(message) {
  return new ErrorResponseJson(message);
}

function successResponse(message) {
  return new SuccessResponseJson(message);
}

function successWithDataResponse(message, data) {
  return new SuccessResponseJsonWithData(message, data);
}

module.exports = {
  NotFoundError,
  ValidationError,
  DuplicateError,
  AuthenticationError,
  UnauthorizedError,
  successResponse,
  errorResponse,
  successWithDataResponse,
  successWithPaginationAndCount,
};
