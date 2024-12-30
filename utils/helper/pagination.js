class PageInfo {
  constructor(limit, currentPage, lastPage) {
    this.limit = limit;
    this.current_page = currentPage;
    this.last_page = lastPage;
  }
}

function calculateData(totalCount, limit, page) {
  const lastPage = Math.ceil(totalCount / limit);
  return new PageInfo(limit, page, lastPage);
}

module.exports = { calculateData };