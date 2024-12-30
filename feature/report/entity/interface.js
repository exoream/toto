class ReportRepositoryInterface {
  async createReport(data, file) {
    throw new Error("Method not implemented");
  }

  async updateReport(id, data, file) {
    throw new Error("Method not implemented");
  }

  async deleteReport(id) {
    throw new Error("Method not implemented");
  }

  async getReportById(id) {
    throw new Error("Method not implemented");
  }

  async getAllReport(search, page, limit) {
    throw new Error("Method not implemented");
  }

  async getReportProfile(userId, search, page, limit) {
    throw new Error("Method not implemented");
  }

  async updateStatusReport(id, status, reason) {
    throw new Error("Method not implemented");
  }

  async likeReport(id, like) {
    throw new Error("Method not implemented");
  }
}

class ReportServiceInterface {
  async createReport(data, file) {
    throw new Error("Method not implemented");
  }

  async updateReport(id, data, file) {
    throw new Error("Method not implemented");
  }

  async deleteReport(id) {
    throw new Error("Method not implemented");
  }

  async getReportById(id) {
    throw new Error("Method not implemented");
  }

  async getAllReport(search, page, limit) {
    throw new Error("Method not implemented");
  }

  async getReportProfile(userId, search, page, limit) {
    throw new Error("Method not implemented");
  }

  async updateStatusReport(id, status, reason) {
    throw new Error("Method not implemented");
  }

  async likeReport(id, like) {
    throw new Error("Method not implemented");
  }
}

module.exports = { ReportRepositoryInterface, ReportServiceInterface };
