const { successWithDataResponse, errorResponse } = require("../../../utils/helper/response");
const { ValidationError } = require("../../../utils/helper/response")
const { message } = require("../../../utils/constanta/constanta");
const loadModel = require("../model/model");
const responseScan = require("../dto/response");

class ScanController {
  constructor(scanService) {
    this.scanService = scanService;
  }

  async predict(req, res) {
    try {
      const image = req.file;
      const model = await loadModel();
      const { label, probability, description } = await this.scanService.predict(image, model);
      return res.status(200).json(successWithDataResponse("Success scan", responseScan(label, probability, description)));
    } catch (error) {
      if (error instanceof ValidationError || error instanceof UnauthorizedError) {
        return res.status(error.statusCode).json(errorResponse(error.message));
      } else {
        console.log(error);
        return res.status(500).json(errorResponse(message.ERROR_INTERNAL_SERVER));
      }
    }
  }
  
}

module.exports = ScanController;
