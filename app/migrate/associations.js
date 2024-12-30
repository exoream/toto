const User = require("../../feature/user/model/model");
const { Report, ReportLikes }= require("../../feature/report/model/model");
const Job = require("../../feature/job/model/model");

// Define associations
User.hasMany(Report, { foreignKey: "id_user", as: "reports" });
Report.belongsTo(User, { foreignKey: "id_user", as: "user" });

ReportLikes.belongsTo(User, { foreignKey: "id_user", as: "user" });
ReportLikes.belongsTo(Report, { foreignKey: "id_report", as: "report" });

User.hasOne(Job, { foreignKey: "id_user", as: "jobs" });
Job.belongsTo(User, { foreignKey: "id_user", as: "user" });

module.exports = { User, Report, ReportLikes, Job };
