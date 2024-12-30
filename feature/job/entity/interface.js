class JobRepositoryInterface {
  async createJob(data, file, userId) {
    throw new Error("Method not implemented");
  }

  async getJobById(id) {
    throw new Error("Method not implemented");
  }

  async getAllJob(search, page, limit) {
    throw new Error("Method not implemented");
  }

  async updateJobById(id, updatedData, file) {
    throw new Error("Method not implemented");
  }

  async deleteJobById(id) {
    throw new Error("Method not implemented");
  }

  async getJobByNik(nik) {
    throw new Error("Method not implemented");
  }

  async getJobProfile(idUser) {
    throw new Error("Method not implemented");
  }

  async getJobByUserId(userId) {
    throw new Error("Method not implemented");
  }

  async updateStatusJobById(id, status) {
    throw new Error("Method not implemented");
  }
}

class JobServicesInterface {
  async createJob(data, file, userId) {
    throw new Error("Method not implemented");
  }

  async getJobById(id) {
    throw new Error("Method not implemented");
  }

  async getAllJob(search, page, limit) {
    throw new Error("Method not implemented");
  }

  async updateJobById(id, updatedData, file) {
    throw new Error("Method not implemented");
  }

  async deleteJobById(id) {
    throw new Error("Method not implemented");
  }

  async getJobProfile(idUser) {
    throw new Error("Method not implemented");
  }

  async updateStatusJobById(id, status) {
    throw new Error("Method not implemented");
  }
}

module.exports = { JobRepositoryInterface, JobServicesInterface };
