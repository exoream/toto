const ScanController = require("../../feature/scan/controller/controller");
const ScanService = require("../../feature/scan/service/service");

const { jwtMiddleware } = require("../../utils/jwt/jwt");
const upload = require("../../utils/storage/multer2");
const express = require('express');

const router = express.Router();

const scanService = new ScanService();
const scanController = new ScanController(scanService);

router.post('/scan', jwtMiddleware, upload.single('image'), scanController.predict.bind(scanController));

module.exports = router;