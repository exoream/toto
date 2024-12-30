const { Sequelize } = require("sequelize");
const config = require("../config/config");

const sequelize = new Sequelize(config.DBNAME, config.DBUSER, config.DBPASS, {
  host: config.DBHOST,
  port: config.DBPORT,
  dialect: "mysql",
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("MySQL connected");
  } catch (error) {
    console.error("Failed to connect to MySQL:", error);
    process.exit(1);
  }
})();

module.exports = sequelize;
