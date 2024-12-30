const { ReportServiceInterface } = require("../entity/interface");
const { ValidationError } = require("../../../utils/helper/response");
const { message } = require("../../../utils/constanta/constanta");
const validator = require("validator");
const capitalizeWords = require("../../../utils/helper/capitalize");

class ReportService extends ReportServiceInterface {
  constructor(reportRepository) {
    super();
    this.reportRepository = reportRepository;
  }

  async createReport(data, file) {
    if (
      !data.location ||
      !data.latitude ||
      !data.longitude ||
      !data.statusDamage ||
      !data.description ||
      !file
    ) {
      throw new ValidationError(message.ERROR_REQUIRED_FIELD);
    }

    if (data.latitude < -90 || data.latitude > 90) {
      throw new ValidationError("Latitude must be between -90 and 90");
    }

    if (data.longitude < -180 || data.longitude > 180) {
      throw new ValidationError("Longitude must be between -180 and 180");
    }

    if (data.description.length < 10) {
      throw new ValidationError(
        "Description must be at least 10 characters long"
      );
    }

    if (file > 10 * 1024 * 1024) {
      throw new ValidationError("File size must not be greater than 10MB");
    }

    const allowedFileTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedFileTypes.includes(file.mimetype)) {
      throw new ValidationError(message.ERROR_INVALID_FILE_TYPE);
    }

    data.statusDamage = capitalizeWords(data.statusDamage);
    const allowedStatusDamage = ["Good", "Heavy Damaged", "Light Damaged"];
    if (!allowedStatusDamage.includes(data.statusDamage)) {
      throw new ValidationError("Status damage must be good, heavy damaged, or light damaged");
    }

    const result = await this.reportRepository.createReport(data, file);
    return result;
  }

  async updateReport(id, data, file) {
    if (!id) {
      throw new ValidationError(message.ERROR_ID);
    }

    if (!validator.isUUID(id)) {
      throw new ValidationError(message.ERROT_ID_INVALID);
    }

    // Validate optional fields if they are provided
    if (data.latitude !== undefined) {
      if (data.latitude < -90 || data.latitude > 90) {
        throw new ValidationError("Latitude must be between -90 and 90");
      }
    }

    if (data.longitude !== undefined) {
      if (data.longitude < -180 || data.longitude > 180) {
        throw new ValidationError("Longitude must be between -180 and 180");
      }
    }

    if (data.description !== undefined) {
      if (data.description.length < 10) {
        throw new ValidationError(
          "Description must be at least 10 characters long"
        );
      }
    }

    if (file) {
      if (file > 10 * 1024 * 1024) {
        throw new ValidationError("File size must not be greater than 10MB");
      }

      const allowedFileTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!allowedFileTypes.includes(file.mimetype)) {
        throw new ValidationError(message.ERROR_INVALID_FILE_TYPE);
      }
    }

    const existingReport = await this.reportRepository.getReportById(id);
    if (existingReport.status === "Rejected" && !data.status) {
      data.status = "Pending";
    }

    if(existingReport.status === "Approved") {
      throw new ValidationError("Status cannot be changed once it is approved");
    }
    
    const result = await this.reportRepository.updateReport(id, data, file);
    return result;
  }

  async deleteReport(id) {
    if (!id) {
      throw new ValidationError(message.ERROR_ID);
    }

    if (!validator.isUUID(id)) {
      throw new ValidationError(message.ERROT_ID_INVALID);
    }

    const result = await this.reportRepository.deleteReport(id);
    return result;
  }

  async getReportById(id) {
    if (!id) {
      throw new ValidationError(message.ERROR_ID);
    }

    if (!validator.isUUID(id)) {
      throw new ValidationError(message.ERROT_ID_INVALID);
    }

    const result = await this.reportRepository.getReportById(id);
    return result;
  }

  async getAllReport(search, page, limit) {
    if (!Number.isInteger(page) || !Number.isInteger(limit)) {
      throw new ValidationError("Page and limit must be a number");
    }

    if (limit > 10) {
      throw new ValidationError("Limit must not be greater than 10");
    }

    if (page === undefined) {
      page = 1;
    }

    if (limit === undefined) {
      limit = 10;
    }

    const { result, pageInfo, totalCount } =
      await this.reportRepository.getAllReport(search, page, limit);
    if (result.length === 0) {
      return {
        result: [],
        pageInfo,
        totalCount: 0,
        message: "No report found",
      };
    }

    return { result, pageInfo, totalCount };
  }

  async getReportProfile(userId, search, page, limit) {
    if (!userId) {
      throw new ValidationError(message.ERROR_ID);
    }

    if (!validator.isUUID(userId)) {
      throw new ValidationError(message.ERROT_ID_INVALID);
    }

    if (!Number.isInteger(page) || !Number.isInteger(limit)) {
      throw new ValidationError("Page and limit must be a number");
    }

    if (limit > 10) {
      throw new ValidationError("Limit must not be greater than 10");
    }

    if (page === undefined) {
      page = 1;
    }

    if (limit === undefined) {
      limit = 10;
    }

    const { result, pageInfo, totalCount } =
      await this.reportRepository.getReportProfile(userId, search, page, limit);
    if (result.length === 0) {
      return {
        result: [],
        pageInfo,
        totalCount: 0,
        message: "No report found",
      };
    }
    return { result, pageInfo, totalCount };
  }

  async updateStatusReport(id, status, reason) {
    if (!id) {
      throw new ValidationError(message.ERROR_ID);
    }

    if (!validator.isUUID(id)) {
      throw new ValidationError(message.ERROT_ID_INVALID);
    }

    if (!status) {
      throw new ValidationError(message.ERROR_REQUIRED_FIELD);
    }

    status = capitalizeWords(status);
    const allowedStatus = ["Pending", "Approved", "Rejected"];
    if (!allowedStatus.includes(status)) {
      throw new ValidationError("Status must be Pending, Approved, or Rejected");
    }

    const currentReport = await this.reportRepository.getReportById(id);
    if (!currentReport) {
      throw new ValidationError(message.ERROR_NOT_FOUND);
    }

    if (currentReport.status === "Approved") {
      throw new ValidationError("Status cannot be changed once it is approved");
    }

    if ((status === "Approved" || status === "Rejected") && !reason) {
      throw new ValidationError("Reason is required when status is rejected");
    }

    const result = await this.reportRepository.updateStatusReport(
      id,
      status,
      reason
    );
    return result;
  }

  async likeReport(id, idUser) {
    if (!id) {
      throw new ValidationError(message.ERROR_ID);
    }

    if (!validator.isUUID(id)) {
      throw new ValidationError(message.ERROT_ID_INVALID);
    }

    const userLikedReport = await this.reportRepository.checkUserLikedReport(
      id,
      idUser
    );

    if (userLikedReport) {
      throw new ValidationError("You have already upvote this report");
    }

    // Check if the user has liked the report
    const currentReport = await this.reportRepository.getReportById(id);
    const updatedLike = currentReport.like + 1;

    const result = await this.reportRepository.likeReport(
      id,
      updatedLike,
      idUser
    );
    return result;
  }
}

module.exports = ReportService;
