const JobController = require("../../feature/job/controller/controller");
const JobService = require("../../feature/job/service/service");
const JobRepository = require("../../feature/job/repository/repository");

const db = require("../database/mysql")
const { jwtMiddleware } = require("../../utils/jwt/jwt");
const upload = require("../../utils/storage/multer");
const express = require('express');

const jobRepository = new JobRepository(db);
const jobService = new JobService(jobRepository);
const jobController = new JobController(jobService);

const router = express.Router();

// User-specific routes
router.post('/jobs', jwtMiddleware, upload.single('file'), jobController.createJob.bind(jobController));
router.get('/jobs/profile', jwtMiddleware, jobController.getJobProfile.bind(jobController));

// User or Admin
router.put('/jobs/:id', jwtMiddleware, upload.single('file'), jobController.updateJobById.bind(jobController));

// Admin
router.get('/jobs', jwtMiddleware, jobController.getAllJob.bind(jobController));
router.get('/jobs/:id', jwtMiddleware, jobController.getJobById.bind(jobController));
router.delete('/jobs/:id', jwtMiddleware, jobController.deleteJobById.bind(jobController));
router.patch('/jobs/:id/status', jwtMiddleware, jobController.updateStatusJobById.bind(jobController));


module.exports = router;