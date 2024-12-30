const userRoute = require('./route_user');
const reportRoute = require('./route_report');
const articleRoute = require('./route_article');
const scanRoute = require('./route_scan');
const jobRoute = require('./route_job');
const express = require('express');


const router = express.Router();

router.use(userRoute);
router.use(reportRoute);
router.use(articleRoute)
router.use(scanRoute);
router.use(jobRoute);

module.exports = router;