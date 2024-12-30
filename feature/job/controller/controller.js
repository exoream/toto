const { jobRequest } = require("../dto/request");
const { jobResponse, listJobResponse } = require("../dto/response");
const {
  successResponse,
  errorResponse,
  successWithDataResponse,
  successWithPaginationAndCount,
} = require("../../../utils/helper/response");
const {
  ValidationError,
  DuplicateError,
  NotFoundError,
  UnauthorizedError,
} = require("../../../utils/helper/response");
const { message } = require("../../../utils/constanta/constanta");
const { extractToken } = require("../../../utils/jwt/jwt");

class JobController {
  constructor(jobService) {
    this.jobService = jobService;
  }

  async createJob(req, res) {
    try {
      const { id } = extractToken(req);
      const data = jobRequest(req.body);
      const file = req.file;
      data.id_user = id;
      console.log("data", data);
      console.log("file", file);
      await this.jobService.createJob(data, file, id);
      return res.status(201).json(successResponse(message.SUCCESS_CREATED));
    } catch (error) {
      if (
        error instanceof ValidationError ||
        error instanceof UnauthorizedError ||
        error instanceof DuplicateError
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

  async getJobById(req, res) {
    const id = req.params.id;
    try {
      const { role } = extractToken(req);
      if (role === "admin") {
        const job = await this.jobService.getJobById(id);
        const response = jobResponse(job);
        return res
          .status(200)
          .json(successWithDataResponse(message.SUCCESS_GET, response));
      } else {
        return res.status(403).json(errorResponse(message.ERROR_FORBIDDEN));
      }
    } catch (error) {
      if (
        error instanceof NotFoundError ||
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

  async getJobProfile(req, res) {
    try {
      const { id } = extractToken(req);
      const job = await this.jobService.getJobProfile(id);
      console.log("data", job);
      const response = jobResponse(job);
      console.log("response", response);
      return res
        .status(200)
        .json(successWithDataResponse(message.SUCCESS_GET, response));
    } catch (error) {
      if (
        error instanceof NotFoundError ||
        error instanceof UnauthorizedError ||
        error instanceof ValidationError
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

  async getAllJob(req, res) {
    try {
      const { search, page, limit } = req.query;

      // Konversi page dan limit ke tipe number
      const pageNumber = parseInt(page, 10) || 1;
      const limitNumber = parseInt(limit, 10) || 10;

      const { role } = extractToken(req);
      if (role === "admin") {
        const { result, pageInfo, totalCount } = await this.jobService.getAllJob(search, pageNumber, limitNumber);
        const response = listJobResponse(result);
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
      } else {
        return res.status(403).json(errorResponse(message.ERROR_FORBIDDEN));
      }
    } catch (error) {
      if (
        error instanceof NotFoundError ||
        error instanceof UnauthorizedError ||
        error instanceof ValidationError
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

  async updateJobById(req, res) {
    const id = req.params.id;
    try {
      const { id: idUser, role } = extractToken(req);
      const data = jobRequest(req.body);
      const file = req.file;
      const job = await this.jobService.getJobById(id);
      console.log("job", job);
      if (role === "admin" || idUser === job.idUser) {
        await this.jobService.updateJobById(id, data, file);
        return res.status(200).json(successResponse(message.SUCCESS_UPDATED));
      } else {
        return res.status(403).json(errorResponse(message.ERROR_FORBIDDEN));
      }
    } catch (error) {
      if (
        error instanceof ValidationError ||
        error instanceof UnauthorizedError ||
        error instanceof NotFoundError ||
        error instanceof DuplicateError
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

  async deleteJobById(req, res) {
    const id = req.params.id;
    try {
      const { role } = extractToken(req);
      if (role === "admin") {
        await this.jobService.deleteJobById(id);
        return res.status(200).json(successResponse(message.SUCCESS_DELETED));
      } else {
        return res.status(403).json(errorResponse(message.ERROR_FORBIDDEN));
      }
    } catch (error) {
      if (
        error instanceof NotFoundError ||
        error instanceof UnauthorizedError ||
        error instanceof ValidationError
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

  async updateStatusJobById(req, res) {
    const id = req.params.id;
    try {
      const { role } = extractToken(req);
      const status = req.body.status;
      if (role === "admin") {
        await this.jobService.updateStatusJobById(id, status);
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
}

module.exports = JobController;
