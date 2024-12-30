function articleResponse(article) {
  const response = {
    id: article.id,
    title: article.title,
    description: article.description,
    image: article.image,
    created_at: article.createdAt,
  };
  return response;
}

function listArticleResponse(article) {
  const response = [];
  for (const data of article) {
    const result = articleResponse(data);
    response.push(result);
  }
  return response;
}

module.exports = { articleResponse, listArticleResponse };
