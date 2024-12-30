const ReportController = require("../../feature/report/controller/controller");
const ReportService = require("../../feature/report/service/service");
const ReportRepository = require("../../feature/report/repository/repository");

const db = require("../database/mysql")
const { jwtMiddleware } = require("../../utils/jwt/jwt");
const upload = require("../../utils/storage/multer");
const express = require('express');

const router = express.Router();

const reportRepository = new ReportRepository(db);
const reportService = new ReportService(reportRepository);
const reportController = new ReportController(reportService);

// User-specific routes
router.get('/reports/profile', jwtMiddleware, reportController.getReportProfile.bind(reportController));

// User or Admin
router.post('/reports', jwtMiddleware, upload.single('image'), reportController.createReport.bind(reportController));
router.put('/reports/:id', jwtMiddleware, upload.single('image'), reportController.updateReport.bind(reportController));
router.get('/reports', jwtMiddleware, reportController.getAllReport.bind(reportController));

// Admin
router.delete('/reports/:id', jwtMiddleware, reportController.deleteReport.bind(reportController));
router.get('/reports/:id', jwtMiddleware, reportController.getReportById.bind(reportController));
router.patch('/reports/:id/status', jwtMiddleware, reportController.updateStatusReport.bind(reportController));

router.post('/reports/:id/upvote', jwtMiddleware, reportController.likeReport.bind(reportController));

module.exports = router;