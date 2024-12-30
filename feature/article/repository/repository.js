const Article = require("../model/model");
const { ArticleRepositoryInterface } = require("../entity/interface");
const { NotFoundError } = require("../../../utils/helper/response");
const {
  articleCoreToArticleModel,
  articleModelToArticleCore,
  listArticleModelToArticleCore,
} = require("../entity/mapping");
const { uploadFileToGCSForArticle } = require("../../../utils/storage/gcp_storage");
const { calculateData } = require("../../../utils/helper/pagination");
const { Op } = require("sequelize");

class ArticleRepository extends ArticleRepositoryInterface {
  constructor() {
    super();
    this.db = Article;
  }

  async createArticle(data, file) {
    const article = articleCoreToArticleModel(data);

    if (file) {
      const imageUrl = await uploadFileToGCSForArticle(file.path);
      article.image = imageUrl;
    }

    const createdArticle = await this.db.create(article);
    const articleCore = articleModelToArticleCore(createdArticle);
    return articleCore;
  }

  async getArticleById(id) {
    const article = await this.db.findByPk(id);
    if (!article) {
      throw new NotFoundError("Article not found");
    }
    const articleCore = articleModelToArticleCore(article);
    return articleCore;
  }

  async getAllArticle(search, page, limit) {
    const offset = (page - 1) * limit;

    let whereClause = {};
    if (search) {
      whereClause = {
        [Op.or]: [
          { title: { [Op.like]: `%${search}%` } }
        ],
      };
    }

    const totalCount = await this.db.count({ where: whereClause });
    const data = await this.db.findAll({
      where: whereClause,
      limit: limit,
      offset: offset,
    });

    const result = listArticleModelToArticleCore(data);
    const pageInfo = calculateData(totalCount, limit, page);
    return { result, pageInfo, totalCount };

  }

  async updateArticleById(id, updatedData, file) {
    const articleModel = articleCoreToArticleModel(updatedData);

    if (file) {
      const imageUrl = await uploadFileToGCSForArticle(file.path);
      articleModel.image = imageUrl;
    }

    const updatedArticle = await this.db.update(articleModel, {
      where: { id: id },
    });
    if (updatedArticle[0] === 0) {
      throw new NotFoundError("Article not found");
    }
    return articleModelToArticleCore(updatedArticle);
  }

  async deleteArticleById(id) {
    const deletedArticle = await this.db.destroy({
      where: { id: id },
    });
    if (deletedArticle === 0) {
      throw new NotFoundError("Article not found");
    }
    return true;
  }

  async getArticleByTitle(title) {
    const article = await this.db.findOne({
      where: { title: title },
    });
    if (!article) {
      return null;
    }
    const articleCore = articleModelToArticleCore(article);
    return articleCore;
  }
}

module.exports = ArticleRepository;
