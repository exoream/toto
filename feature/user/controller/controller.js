const {
  successResponse,
  errorResponse,
  successWithDataResponse,
  successWithPaginationAndCount,
} = require("../../../utils/helper/response");
const {
  ValidationError,
  DuplicateError,
  NotFoundError,
  UnauthorizedError,
  ForbiddenResponse,
} = require("../../../utils/helper/response");
const { message } = require("../../../utils/constanta/constanta");
const {
  userRequest,
  loginRequest,
  userUpdateRequest,
  updatePasswordRequest,
  newPasswordRequest,
} = require("../dto/request");
const {
  loginResponse,
  userResponse,
  userListResponse,
} = require("../dto/response");
const {
  extractToken,
  extractTokenVerifikasi,
} = require("../../../utils/jwt/jwt");
const path = require("path");
const fs = require("fs");

class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  async createUser(req, res) {
    try {
      const user = userRequest(req.body);
      console.log("Request:", user);
      await this.userService.createUser(user);
      return res.status(201).json(successResponse(message.SUCCESS_CREATED));
    } catch (error) {
      if (error instanceof ValidationError || error instanceof DuplicateError) {
        return res.status(error.statusCode).json(errorResponse(error.message));
      } else {
        console.log(error);
        return res
          .status(500)
          .json(errorResponse(message.ERROR_INTERNAL_SERVER));
      }
    }
  }

  async login(req, res) {
    try {
      const login = loginRequest(req.body);
      const { user, token } = await this.userService.login(
        login.email,
        login.password
      );
      const response = loginResponse(user, token);
      return res
        .status(200)
        .json(successWithDataResponse("Login success", response));
    } catch (error) {
      if (error instanceof ValidationError || error instanceof NotFoundError) {
        return res.status(error.statusCode).json(errorResponse(error.message));
      } else {
        return res
          .status(500)
          .json(errorResponse(message.ERROR_INTERNAL_SERVER));
      }
    }
  }

  async getUserById(req, res) {
    const userId = req.params.id;
    try {
      const { id, role } = extractToken(req);
      if (role === "admin" || id === userId) {
        const user = await this.userService.getUserById(userId);
        const response = userResponse(user);
        return res
          .status(200)
          .json(successWithDataResponse(message.SUCCESS_GET, response));
      } else {
        return res.status(403).json(errorResponse(message.ERROR_FORBIDDEN));
      }
    } catch (error) {
      if (
        error instanceof NotFoundError ||
        error instanceof ValidationError ||
        error instanceof UnauthorizedError
      ) {
        return res.status(error.statusCode).json(errorResponse(error.message));
      } else {
        console.log(error);
        return res
          .status(500)
          .json(errorResponse(message.ERROR_INTERNAL_SERVER));
      }
    }
  }

  async getAllUsers(req, res) {
    try {
      const { search, page, limit } = req.query;

      // Konversi page dan limit ke tipe number
      const pageNumber = parseInt(page, 10) || 1;
      const limitNumber = parseInt(limit, 10) || 10;

      const { role } = extractToken(req);
      console.log("role", role);
      if (role === "admin") {
        const { result, pageInfo, totalCount } =
          await this.userService.getAllUser(search, pageNumber, limitNumber);
        const response = userListResponse(result);
        return res
          .status(200)
          .json(
            successWithPaginationAndCount(
              message.SUCCESS_GET_ALL,
              response,
              pageInfo,
              totalCount
            )
          );
      } else {
        return res.status(403).json(errorResponse(message.ERROR_FORBIDDEN));
      }
    } catch (error) {
      if (
        error instanceof NotFoundError ||
        error instanceof UnauthorizedError ||
        error instanceof ValidationError
      ) {
        return res.status(error.statusCode).json(errorResponse(error.message));
      } else {
        console.log(error);
        return res
          .status(500)
          .json(errorResponse(message.ERROR_INTERNAL_SERVER));
      }
    }
  }

  async updateUserById(req, res) {
    const userId = req.params.id;
    const user = userUpdateRequest(req.body);

    try {
      const { id, role } = extractToken(req);
      if (role === "admin" || id === userId) {
        await this.userService.updateUserById(userId, user);
        return res.status(200).json(successResponse(message.SUCCESS_UPDATED));
      } else {
        return res.status(403).json(errorResponse(message.ERROR_FORBIDDEN));
      }
    } catch (error) {
      if (
        error instanceof NotFoundError ||
        error instanceof ValidationError ||
        error instanceof DuplicateError ||
        error instanceof UnauthorizedError
      ) {
        return res.status(error.statusCode).json(errorResponse(error.message));
      }
      console.log(error);
      return res.status(500).json(errorResponse(message.ERROR_INTERNAL_SERVER));
    }
  }

  async deleteUserById(req, res) {
    const userId = req.params.id;
    try {
      const { role } = extractToken(req);
      if (role === "admin") {
        await this.userService.deleteUserById(userId);
        return res.status(200).json(successResponse(message.SUCCESS_DELETED));
      } else {
        return res.status(403).json(errorResponse(message.ERROR_FORBIDDEN));
      }
    } catch (error) {
      if (
        error instanceof NotFoundError ||
        error instanceof ValidationError ||
        error instanceof UnauthorizedError
      ) {
        return res.status(error.statusCode).json(errorResponse(error.message));
      }
      return res.status(500).json(errorResponse(message.ERROR_INTERNAL_SERVER));
    }
  }

  async updatePassword(req, res) {
    const userId = req.params.id;
    const user = updatePasswordRequest(req.body);
    try {
      const { id, role } = extractToken(req);
      if (role === "admin" || id === userId) {
        await this.userService.updatePassword(
          userId,
          user.oldPassword,
          user.newPassword,
          user.confirmPassword
        );
        return res.status(200).json(successResponse(message.SUCCESS_UPDATED));
      } else {
        return res.status(403).json(errorResponse(message.ERROR_FORBIDDEN));
      }
    } catch (error) {
      if (
        error instanceof NotFoundError ||
        error instanceof ValidationError ||
        error instanceof UnauthorizedError
      ) {
        return res.status(error.statusCode).json(errorResponse(error.message));
      }
      return res.status(500).json(errorResponse(message.ERROR_INTERNAL_SERVER));
    }
  }

  async getProfile(req, res) {
    try {
      const { id } = extractToken(req);
      const user = await this.userService.getUserById(id);
      const response = userResponse(user);
      return res
        .status(200)
        .json(successWithDataResponse(message.SUCCESS_GET, response));
    } catch (error) {
      if (
        error instanceof NotFoundError ||
        error instanceof ValidationError ||
        error instanceof UnauthorizedError
      ) {
        return res.status(error.statusCode).json(errorResponse(error.message));
      } else {
        console.log(error);
        return res
          .status(500)
          .json(errorResponse(message.ERROR_INTERNAL_SERVER));
      }
    }
  }

  async updateProfile(req, res) {
    try {
      const user = userUpdateRequest(req.body);
      const { id } = extractToken(req);

      await this.userService.updateUserById(id, user);
      return res.status(200).json(successResponse(message.SUCCESS_UPDATED));
    } catch (error) {
      if (
        error instanceof NotFoundError ||
        error instanceof ValidationError ||
        error instanceof DuplicateError ||
        error instanceof UnauthorizedError
      ) {
        return res.status(error.statusCode).json(errorResponse(error.message));
      }
      console.log(error);
      return res.status(500).json(errorResponse(message.ERROR_INTERNAL_SERVER));
    }
  }

  async updatePasswordProfile(req, res) {
    try {
      const user = updatePasswordRequest(req.body);
      const { id } = extractToken(req);

      await this.userService.updatePassword(
        id,
        user.oldPassword,
        user.newPassword,
        user.confirmPassword
      );
      return res
        .status(200)
        .json(successResponse(message.SUCCES_UPDATE_PASSWORD));
    } catch (error) {
      if (
        error instanceof NotFoundError ||
        error instanceof ValidationError ||
        error instanceof UnauthorizedError
      ) {
        return res.status(error.statusCode).json(errorResponse(error.message));
      }
      return res.status(500).json(errorResponse(message.ERROR_INTERNAL_SERVER));
    }
  }

  async sendOtpEmail(req, res) {
    try {
      const email = req.body.email;
      await this.userService.sendOtpEmail(email);
      return res.status(200).json(successResponse(message.SUCCESS_SEND_OTP));
    } catch (error) {
      if (error instanceof NotFoundError || error instanceof ValidationError) {
        return res.status(error.statusCode).json(errorResponse(error.message));
      }
      console.log(error);
      return res.status(500).json(errorResponse(message.ERROR_INTERNAL_SERVER));
    }
  }

  async verifyOtpEmail(req, res) {
    try {
      const email = req.body.email;
      const otp = req.body.otp;
      const token = await this.userService.verifyOtpEmail(email, otp);
      return res
        .status(200)
        .json(successWithDataResponse("Success verify otp", { token }));
    } catch (error) {
      if (error instanceof NotFoundError || error instanceof ValidationError) {
        return res.status(error.statusCode).json(errorResponse(error.message));
      }
      console.log(error);
      return res.status(500).json(errorResponse(message.ERROR_INTERNAL_SERVER));
    }
  }

  async newPassword(req, res) {
    try {
      const request = newPasswordRequest(req.body);
      const extraToken = extractTokenVerifikasi(req);
      await this.userService.newPassword(
        extraToken,
        request.password,
        request.confirmPassword
      );
      return res
        .status(200)
        .json(successResponse(message.SUCCES_UPDATE_PASSWORD));
    } catch (error) {
      if (
        error instanceof NotFoundError ||
        error instanceof ValidationError ||
        error instanceof UnauthorizedError
      ) {
        return res.status(error.statusCode).json(errorResponse(error.message));
      }
      return res.status(500).json(errorResponse(message.ERROR_INTERNAL_SERVER));
    }
  }

  async VerifyAccount(req, res) {
    try {
      const token = req.query.token;
      const alreadyVerified = await this.userService.verifyToken(token);

      let templatePath;
      if (alreadyVerified) {
        templatePath = path.join(
          __dirname,
          "../../../utils/template/verification_active.html"
        );
      } else {
        templatePath = path.join(
          __dirname,
          "../../../utils/template/success_verification.html"
        );
      }

      const emailContent = fs.readFileSync(templatePath, "utf-8");
      return res.status(200).send(emailContent);
    } catch (error) {
      if (error instanceof NotFoundError || error instanceof ValidationError) {
        return res.status(error.statusCode).json(errorResponse(error.message));
      }
      console.log(error);
      return res.status(500).json(errorResponse(message.ERROR_INTERNAL_SERVER));
    }
  }
}

module.exports = UserController;
