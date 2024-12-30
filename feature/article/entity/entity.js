class ArticleCore {
  constructor(id, title, description, image, createdAt) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.image = image;
    this.createdAt = createdAt;
  }
}

module.exports = ArticleCore;
