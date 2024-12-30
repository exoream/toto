const { JobServicesInterface } = require("../entity/interface");
const {
  ValidationError,
  NotFoundError,
  DuplicateError,
} = require("../../../utils/helper/response");
const validator = require("validator");
const { message } = require("../../../utils/constanta/constanta");
const capitalizeWords = require("../../../utils/helper/capitalize");

class JobService extends JobServicesInterface {
  constructor(jobRepo) {
    super();
    this.jobRepo = jobRepo;
  }

  async createJob(data, file, userId) {
    if (!data.name || !data.nik || !data.address || !data.phone || !file) {
      throw new ValidationError(message.ERROR_REQUIRED_FIELD);
    }

    if (data.nik.length < 16) {
      throw new ValidationError("NIK must be at least 16 characters long");
    }

    if (data.phone.length < 10) {
      throw new ValidationError("Phone must be at least 10 characters long");
    }

    // Cek apakah pengguna sudah memiliki Job
    const existingJob = await this.jobRepo.getJobByUserId(userId);
    if (existingJob) {
      throw new DuplicateError("User already has a registered job");
    }

    const nikExist = await this.jobRepo.getJobByNik(data.nik);
    if (nikExist) {
      throw new DuplicateError("NIK already exist");
    }

    if (file > 10 * 1024 * 1024) {
      throw new ValidationError("File size must not be greater than 10MB");
    }

    const allowedFileTypes = ["application/pdf"];
    if (!allowedFileTypes.includes(file.mimetype)) {
      throw new ValidationError(
        "Invalid file type. Only PDF format is allowed"
      );
    }

    const job = await this.jobRepo.createJob(data, file);
    return job;
  }

  async getJobById(id) {
    if (!id) {
      throw new ValidationError("Id is required");
    }

    if (!validator.isUUID(id)) {
      throw new ValidationError(message.ERROT_ID_INVALID);
    }

    const job = await this.jobRepo.getJobById(id);
    return job;
  }

  async getAllJob(search, page, limit) {
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

    const { result, pageInfo, totalCount } = await this.jobRepo.getAllJob(
      search,
      page,
      limit
    );
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

  async updateJobById(id, updatedData, file) {
    if (!id) {
      throw new ValidationError("Id is required");
    }

    if (!validator.isUUID(id)) {
      throw new ValidationError(message.ERROT_ID_INVALID);
    }

    const job = await this.jobRepo.getJobById(id);
    if (!job) {
      throw new NotFoundError("Job not found");
    }

    if (job.status === "Approved") {
      throw new ValidationError("Job has been approved and cannot be updated");
    }

    // Validate NIK if provided
    if (updatedData.nik) {
      if (updatedData.nik.length < 16) {
        throw new ValidationError("NIK must be at least 16 characters long");
      }

      const nikExist = await this.jobRepo.getJobByNik(updatedData.nik);
      if (nikExist && nikExist.id !== id) {
        throw new DuplicateError("NIK already exists for another job");
      }
    }

    // Validate phone number if provided
    if (updatedData.phone) {
      if (updatedData.phone.length < 10) {
        throw new ValidationError("Phone must be at least 10 characters long");
      }
    }

    // Validate file if provided
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        // File size should not exceed 10MB
        throw new ValidationError("File size must not be greater than 10MB");
      }

      const allowedFileTypes = ["application/pdf"];
      if (!allowedFileTypes.includes(file.mimetype)) {
        // File must be a PDF
        throw new ValidationError("Invalid file type. Only PDF is allowed.");
      }
    }

    // If the job status is rejected, the status must be set to pending
    if (job.status === "Rejected" && !updatedData.status) {
      updatedData.status = "Pending";
    }

    const updatedJob = await this.jobRepo.updateJobById(id, updatedData, file);
    return updatedJob;
  }

  async deleteJobById(id) {
    if (!id) {
      throw new ValidationError("Id is required");
    }

    if (!validator.isUUID(id)) {
      throw new ValidationError(message.ERROT_ID_INVALID);
    }

    const deletedJob = await this.jobRepo.deleteJobById(id);
    if (!deletedJob) {
      throw new NotFoundError("Job not found");
    }
    return deletedJob;
  }

  async getJobProfile(idUser) {
    if (!idUser) {
      throw new ValidationError("Id is required");
    }

    if (!validator.isUUID(idUser)) {
      throw new ValidationError(message.ERROT_ID_INVALID);
    }

    const job = await this.jobRepo.getJobProfile(idUser);
    return job;
  }

  async updateStatusJobById(id, status) {
    if (!id) {
      throw new ValidationError("Id is required");
    }

    if (!validator.isUUID(id)) {
      throw new ValidationError(message.ERROT_ID_INVALID);
    }

    if (!status) {
      throw new ValidationError("Status is required");
    }
    
    const job = await this.jobRepo.getJobById(id);
    if (job.status === "Approved") {
      throw new ValidationError("Job has been approved and cannot be updated");
    }

    status = capitalizeWords(status);
    const allowedStatus = ["Pending", "Approved", "Rejected"];
    if (!allowedStatus.includes(status)) {
      throw new ValidationError("Invalid status");
    }

    const updatedJob = await this.jobRepo.updateStatusJobById(id, status);
    return updatedJob;
  }
}

module.exports = JobService;
