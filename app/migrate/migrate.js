const { User, Report, ReportLikes, Job } = require("./associations");
const Article = require("../../feature/article/model/model");

async function autoMigrate() {
  await User.sync();
  await Report.sync();
  await Article.sync();
  await ReportLikes.sync();
  await Job.sync();
  console.log("Auto migration successful");
}

module.exports = autoMigrate;
