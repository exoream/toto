const { reportRequest } = require("../dto/request");
const { extractToken } = require("../../../utils/jwt/jwt");
const { message } = require("../../../utils/constanta/constanta");
const {
  ValidationError,
  UnauthorizedError,
  NotFoundError,
} = require("../../../utils/helper/response");
const {
  successResponse,
  errorResponse,
  successWithDataResponse,
  successWithPaginationAndCount,
} = require("../../../utils/helper/response");
const { reportResponse, reportListResponse } = require("../dto/response");
const { DatabaseError } = require("sequelize");

class ReportController {
  constructor(userService) {
    this.userService = userService;
  }

  async createReport(req, res, next) {
    try {
      const request = reportRequest(req.body);
      const image = req.file;

      const { id } = extractToken(req);
      request.userId = id;
      console.log("Request:", request);
      console.log("user id:", request.userId);
      console.log("image:", image);

      await this.userService.createReport(request, image);
      return res.status(201).json(successResponse(message.SUCCESS_CREATED));
    } catch (error) {
      if (
        error instanceof ValidationError ||
        error instanceof UnauthorizedError
      ) {
        return res.status(error.statusCode).json(errorResponse(error.message));
      } else {
        console.log(error);
        return res
          .status(500)
          .json(errorResponse(message.ERROR_INTERNAL_SERVER));
      }
    }
  }

  async updateReport(req, res) {
    try {
      const { id } = req.params;
      const request = reportRequest(req.body);
      const image = req.file;

      const { id: idUser, role } = extractToken(req);

      const report = await this.userService.getReportById(id);
      if (role === "admin" || report.userId === idUser) {
        await this.userService.updateReport(id, request, image);
        return res.status(200).json(successResponse(message.SUCCESS_UPDATED));
      } else {
        return res.status(403).json(errorResponse(message.ERROR_FORBIDDEN));
      }
    } catch (error) {
      if (
        error instanceof ValidationError ||
        error instanceof UnauthorizedError ||
        error instanceof NotFoundError
      ) {
        return res.status(error.statusCode).json(errorResponse(error.message));
      } else {
        console.log(error);
        return res
          .status(500)
          .json(errorResponse(message.ERROR_INTERNAL_SERVER));
      }
    }
  }

  async deleteReport(req, res) {
    try {
      const userId = req.params.id;
      const { role } = extractToken(req);
      if (role === "admin") {
        await this.userService.deleteReport(userId);
        return res.status(200).json(successResponse(message.SUCCESS_DELETED));
      } else {
        return res.status(403).json(errorResponse(message.ERROR_FORBIDDEN));
      }
    } catch (error) {
      if (
        error instanceof ValidationError ||
        error instanceof UnauthorizedError ||
        error instanceof NotFoundError
      ) {
        return res.status(error.statusCode).json(errorResponse(error.message));
      } else {
        return res
          .status(500)
          .json(errorResponse(message.ERROR_INTERNAL_SERVER));
      }
    }
  }

  async getReportById(req, res) {
    try {
      const id = req.params.id;
      const data = await this.userService.getReportById(id);
      const response = reportResponse(data);
      return res
        .status(200)
        .json(successWithDataResponse(message.SUCCESS_GET, response));
    } catch (error) {
      if (
        error instanceof ValidationError ||
        error instanceof UnauthorizedError ||
        error instanceof NotFoundError
      ) {
        return res.status(error.statusCode).json(errorResponse(error.message));
      } else {
        return res
          .status(500)
          .json(errorResponse(message.ERROR_INTERNAL_SERVER));
      }
    }
  }

  async getAllReport(req, res) {
    try {
      const { search, page, limit } = req.query;

      // Konversi page dan limit ke tipe number
      const pageNumber = parseInt(page, 10) || 1;
      const limitNumber = parseInt(limit, 10) || 10;

      const { result, pageInfo, totalCount } =
        await this.userService.getAllReport(search, pageNumber, limitNumber);
      const response = reportListResponse(result);
      return res
        .status(200)
        .json(
          successWithPaginationAndCount(
            message.SUCCESS_GET_ALL,
            response,
            pageInfo,
            totalCount
          )
        );
    } catch (error) {
      if (
        error instanceof ValidationError ||
        error instanceof UnauthorizedError
      ) {
        return res.status(error.statusCode).json(errorResponse(error.message));
      } else {
        console.log(error);
        return res
          .status(500)
          .json(errorResponse(message.ERROR_INTERNAL_SERVER));
      }
    }
  }

  async getReportProfile(req, res) {
    try {
      const { search, page, limit } = req.query;

      // Konversi page dan limit ke tipe number
      const pageNumber = parseInt(page, 10) || 1;
      const limitNumber = parseInt(limit, 10) || 10;

      const { id } = extractToken(req);
      const { result, pageInfo, totalCount } =
        await this.userService.getReportProfile(
          id,
          search,
          pageNumber,
          limitNumber
        );
      const response = reportListResponse(result);
      return res
        .status(200)
        .json(
          successWithPaginationAndCount(
            message.SUCCESS_GET_ALL,
            response,
            pageInfo,
            totalCount
          )
        );
    } catch (error) {
      if (
        error instanceof ValidationError ||
        error instanceof UnauthorizedError
      ) {
        return res.status(error.statusCode).json(errorResponse(error.message));
      } else {
        console.log(error);
        return res
          .status(500)
          .json(errorResponse(message.ERROR_INTERNAL_SERVER));
      }
    }
  }

  async updateStatusReport(req, res) {
    try {
      const id = req.params.id;
      const { status, reason } = req.body;
      const { role } = extractToken(req);
      if (role === "admin") {
        await this.userService.updateStatusReport(id, status, reason);
        return res.status(200).json(successResponse(message.SUCCESS_UPDATED));
      } else {
        return res.status(403).json(errorResponse(message.ERROR_FORBIDDEN));
      }
    } catch (error) {
      if (
        error instanceof ValidationError ||
        error instanceof UnauthorizedError ||
        error instanceof NotFoundError
      ) {
        return res.status(error.statusCode).json(errorResponse(error.message));
      } else {
        console.log(error);
        return res
          .status(500)
          .json(errorResponse(message.ERROR_INTERNAL_SERVER));
      }
    }
  }

  async likeReport(req, res) {
    try {
      const id = req.params.id;
      const { id: idUser } = extractToken(req);
      await this.userService.likeReport(id, idUser);
      return res.status(200).json(successResponse("Success upvote report"));
    } catch (error) {
      if (
        error instanceof ValidationError ||
        error instanceof UnauthorizedError ||
        error instanceof NotFoundError
      ) {
        return res.status(error.statusCode).json(errorResponse(error.message));
      } else if (
        error instanceof DatabaseError &&
        error.original.code === "ER_LOCK_WAIT_TIMEOUT"
      ) {
        return res.status(409).json(errorResponse("Please try again"));
      } else {
        console.log(error);
        return res
          .status(500)
          .json(errorResponse(message.ERROR_INTERNAL_SERVER));
      }
    }
  }
}

module.exports = ReportController;
