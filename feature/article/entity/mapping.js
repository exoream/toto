const ArticleCore = require("./entity");

// Mapping dari Main ke Model
function articleCoreToArticleModel(mainData) {
  return {
    id: mainData.id,
    title: mainData.title,
    description: mainData.description,
    image: mainData.image,
    created_at: mainData.createdAt,
  };
}

function listArticleCoreToArticleModel(mainData) {
  const listArticle = [];
  for (const article of mainData) {
    const articleModel = articleCoreToArticleModel(article);
    listArticle.push(articleModel);
  }
  return listArticle;
}

// Mapping dari Model ke Main
function articleModelToArticleCore(mainData) {
  const articleCore = new ArticleCore(
    mainData.id,
    mainData.title,
    mainData.description,
    mainData.image,
    mainData.created_at
  );
  return articleCore;
}

// Mapping dari Model ke Main untuk array
function listArticleModelToArticleCore(mainData) {
  const listArticle = [];
  for (const article of mainData) {
    const articleCore = articleModelToArticleCore(article);
    listArticle.push(articleCore);
  }
  return listArticle;
}

module.exports = {
  articleCoreToArticleModel,
  listArticleCoreToArticleModel,
  articleModelToArticleCore,
  listArticleModelToArticleCore,
};
