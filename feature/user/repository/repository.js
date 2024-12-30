const User = require("../model/model");
const { UserRepositoryInterface } = require("../entity/interface");
const { NotFoundError } = require("../../../utils/helper/response");
const {
  usersCoreToUsersModel,
  usersModelToUsersCore,
  listUserModelToUserCore,
} = require("../entity/mapping");
const { Op } = require("sequelize");
const { calculateData } = require("../../../utils/helper/pagination");

class UserRepository extends UserRepositoryInterface {
  constructor() {
    super();
    this.db = User;
  }

  async createUser(data) {
    const user = usersCoreToUsersModel(data);
    console.log("User data before creating user:", user);
    const createdUser = await User.create(user);
    const userCore = usersModelToUsersCore(createdUser);
    return userCore;
  }

  async getUserById(id) {
    const user = await User.findByPk(id);
    if (!user) {
      throw new NotFoundError("User not found");
    }
    const userCore = usersModelToUsersCore(user);
    return userCore;
  }

  async getAllUser(search, page, limit) {
    const offset = (page - 1) * limit;

    let whereClause = {};
    if (search) {
      whereClause = {
        [Op.or]: [
          { name: { [Op.like]: `%${search}%` } },
          { username: { [Op.like]: `%${search}%` } },
          { email: { [Op.like]: `%${search}%` } },
        ],
      };
    }

    const totalCount = await User.count({ where: whereClause });
    const data = await User.findAll({
      where: whereClause,
      limit: limit,
      offset: offset,
    });

    const result = listUserModelToUserCore(data);
    const pageInfo = calculateData(totalCount, limit, page);
    return { result, pageInfo, totalCount };
  }

  async updateUserById(id, updatedData) {
    const userModel = usersCoreToUsersModel(updatedData);
    const updatedUser = await User.update(userModel, {
      where: { id: id },
    });
    if (updatedUser[0] === 0) {
      throw new NotFoundError("User not found");
    }
    return usersModelToUsersCore(updatedUser);
  }

  async deleteUserById(id) {
    const deletedUser = await User.destroy({
      where: { id: id },
    });
    if (deletedUser === 0) {
      throw new NotFoundError("User not found");
    }
    return true;
  }

  async getUserByEmail(email) {
    const user = await User.findOne({
      where: { email: email },
    });
    if (!user) {
      return null;
    }
    const userCore = usersModelToUsersCore(user);
    return userCore;
  }

  async getUserByUsername(username) {
    const user = await User.findOne({
      where: { username: username },
    });
    if (!user) {
      return null;
    }
    const userCore = usersModelToUsersCore(user);
    return userCore;
  }

  async sendOtpEmail(email, otp, otpExpired) {
    const user = await User.findOne({
      where: { email: email },
    });

    if (!user) {
      throw new NotFoundError("User not found");
    }

    user.otp = otp;
    user.otp_expired_time = otpExpired;
    await user.save();

    const result = usersModelToUsersCore(user);
    return result;
  }

  async verifyOtpEmail(email, otp) {
    const user = await User.findOne({
      where: { email: email, otp: otp },
    });

    if (!user) {
      throw new NotFoundError("User not found or OTP is incorrect");
    }

    const result = usersModelToUsersCore(user);
    return result;
  }

  async resetOtpEmail(otp) {
    const user = await User.findOne({
      where: { otp: otp },
    });

    if (!user) {
      throw new NotFoundError("Otp not found");
    }

    user.otp = null;
    user.otp_expired_time = null;
    await user.save();

    const result = usersModelToUsersCore(user);
    return result;
  }

  async getVerificationToken(token) {
    const user = await User.findOne({
      where: { verification_token: token },
    });

    if (!user) {
      throw new NotFoundError("token not found");
    }

    const result = usersModelToUsersCore(user);
    return result;
  }
}

module.exports = UserRepository;
