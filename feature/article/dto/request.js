function articleRequest(body) {
  const { title, description } = body;
  return { title, description };
}


module.exports = { articleRequest };