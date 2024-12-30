const { ArticleServicesInterface } = require("../entity/interface");
const {
  ValidationError,
  NotFoundError,
} = require("../../../utils/helper/response");
const validator = require("validator");
const { message } = require("../../../utils/constanta/constanta");

class ArticleService extends ArticleServicesInterface {
  constructor(articleRepo) {
    super();
    this.articleRepo = articleRepo;
  }

  async createArticle(data, file) {
    // Validate required fields
    if (!data.title || !data.description || !file) {
      throw new ValidationError(message.ERROR_REQUIRED_FIELD);
    }

    // Validate title length
    if (data.title.length < 5) {
      throw new ValidationError("Title must be at least 5 characters long");
    }

    // Validate description length
    if (data.description.length < 10) {
      throw new ValidationError(
        "Description must be at least 10 characters long"
      );
    }

    // Check if title is already exist
    const titleExist = await this.articleRepo.getArticleByTitle(data.title);
    if (titleExist) {
      throw new ValidationError("Title already exist");
    }

    if (file > 10 * 1024 * 1024) {
      throw new ValidationError("File size must not be greater than 10MB");
    }

    const allowedFileTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedFileTypes.includes(file.mimetype)) {
      throw new ValidationError(message.ERROR_INVALID_FILE_TYPE);
    }

    const article = await this.articleRepo.createArticle(data, file);
    return article;
  }

  async getArticleById(id) {
    if (!id) {
      throw new ValidationError("Id is required");
    }

    if (!validator.isUUID(id)) {
      throw new ValidationError(message.ERROT_ID_INVALID);
    }

    const article = await this.articleRepo.getArticleById(id);
    return article;
  }

  async getAllArticle(search, page, limit) {
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
      await this.articleRepo.getAllArticle(search, page, limit);
    if (result.length === 0) {
      return {
        result: [],
        pageInfo,
        totalCount: 0,
        message: "No article found",
      };
    }

    return { result, pageInfo, totalCount };
  }

  async updateArticleById(id, updatedData, file) {
    if (!id) {
      throw new ValidationError(message.ERROR_ID);
    }

    if (!validator.isUUID(id)) {
      throw new ValidationError(message.ERROT_ID_INVALID);
    }

    if (updatedData.title !== undefined) {
      if (updatedData.title.length < 5) {
        throw new ValidationError("Title must be at least 5 characters long");
      }
    }

    // Validate title length
    if (updatedData.description !== undefined) {
      if (updatedData.description.length < 10) {
        throw new ValidationError(
          "Description must be at least 10 characters long"
        );
      }
    }

    // Validate description length
    if (updatedData.description.length < 10) {
      throw new ValidationError(
        "Description must be at least 10 characters long"
      );
    }

    // Check if title is already exist
    const titleExist = await this.articleRepo.getArticleByTitle(
      updatedData.title
    );
    if (titleExist) {
      throw new ValidationError("Title already exist");
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

    const article = await this.articleRepo.updateArticleById(id, updatedData);
    return article;
  }

  async deleteArticleById(id) {
    if (!id) {
      throw new ValidationError("Id is required");
    }

    if (!validator.isUUID(id)) {
      throw new ValidationError(message.ERROT_ID_INVALID);
    }

    const article = await this.articleRepo.deleteArticleById(id);
    return article;
  }
}

module.exports = ArticleService;
