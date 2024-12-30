const express = require("express");
const cors = require("cors");
const sequelize = require("./app/database/mysql");
const routes = require("./app/route/route");
const autoMigrate = require("./app/migrate/migrate");
const swaggerUi = require("swagger-ui-express");
const swaggerUserDocs = require("./swagger/userdocs.json");
const swaggerAdminDocs = require("./swagger/admindocs.json");
const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use(routes);

const PORT = process.env.SERVERPORT || 8080;
const userDocsServe = swaggerUi.serveFiles(swaggerUserDocs, {});
const userDocsSetup = swaggerUi.setup(swaggerUserDocs);

// Create Swagger middleware for admin docs
const adminDocsServe = swaggerUi.serveFiles(swaggerAdminDocs, {});
const adminDocsSetup = swaggerUi.setup(swaggerAdminDocs);

app.use("/users-docs", userDocsServe, userDocsSetup);
app.use("/admin-docs", adminDocsServe, adminDocsSetup);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    autoMigrate();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

startServer();
