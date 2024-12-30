const { JobRepositoryInterface } = require("../entity/interface");
const Job = require("../model/model");
const { NotFoundError } = require("../../../utils/helper/response");
const {
  jobCoreToJobModel,
  jobModelToJobCore,
  listJobModelToJobCore,
} = require("../entity/mapping");
const { calculateData } = require("../../../utils/helper/pagination");
const { Op } = require("sequelize");
const { uploadPDFForJob } = require("../../../utils/storage/gcp_storage");

class JobRepository extends JobRepositoryInterface {
  constructor() {
    super();
    this.db = Job;
  }

  async createJob(data, file, userId) {
    const job = jobCoreToJobModel(data);

    if (file) {
      const imageUrl = await uploadPDFForJob(file.path);
      job.file = imageUrl;
    }

    const createdJob = await this.db.create(job);
    const jobCore = jobModelToJobCore(createdJob);
    return jobCore;
  }

  async getJobById(id) {
    const job = await this.db.findByPk(id);
    if (!job) {
      throw new NotFoundError("Job not found");
    }
    const jobCore = jobModelToJobCore(job);
    return jobCore;
  }

  async getAllJob(search, page, limit) {
    const offset = (page - 1) * limit;

    let whereClause = {};
    if (search) {
      whereClause = {
        [Op.or]: [
          { name: { [Op.like]: `%${search}%` } },
          { nik: { [Op.like]: `%${search}%` } },
          { phone: { [Op.like]: `%${search}%` } },
        ],
      };
    }

    const totalCount = await this.db.count({ where: whereClause });
    const reports = await this.db.findAll({
      where: whereClause,
      limit: limit,
      offset: offset,
    });

    const result = listJobModelToJobCore(reports);
    const pageInfo = calculateData(totalCount, limit, page);
    return { result, pageInfo, totalCount };
  }

  async updateJobById(id, updatedData, file) {
    const jobModel = jobCoreToJobModel(updatedData);

    if (file) {
      const imageUrl = await uploadPDFForJob(file.path);
      jobModel.file = imageUrl;
    }

    const updatedJob = await this.db.update(jobModel, {
      where: { id: id },
    });
    if (updatedJob[0] === 0) {
      throw new NotFoundError("Job not found");
    }
    return jobModelToJobCore(updatedJob);
  }

  async deleteJobById(id) {
    const deletedJob = await this.db.destroy({
      where: { id: id },
    });
    if (!deletedJob) {
      throw new NotFoundError("Job not found");
    }
    return deletedJob;
  }

  async getJobByNik(nik) {
    const job = await this.db.findOne({
      where: { nik: nik },
    });
    if (!job) {
      return null;
    }
    const jobCore = jobModelToJobCore(job);
    return jobCore;
  }

  async getJobProfile(idUser) {
    const job = await this.db.findOne({
      where: { id_user: idUser },
    });
    if (!job) {
      throw new NotFoundError("Job not found");
    }
    const jobCore = jobModelToJobCore(job);
    return jobCore;
  }

  async getJobByUserId(userId) {
    const job = await this.db.findOne({
      where: { id_user: userId },
    });
    if (!job) {
      return null;
    }
    const jobCore = jobModelToJobCore(job);
    return jobCore;
  }

  async updateStatusJobById(id, status) {
    const updatedJob = await this.db.update(
      { status: status },
      {
        where: { id: id },
      }
    );
    if (updatedJob[0] === 0) {
      throw new NotFoundError("Job not found");
    }
    return updatedJob;
  }
}

module.exports = JobRepository;
