const { DataTypes } = require("sequelize");
const sequelize = require("../../../app/database/mysql");
const Report = require("../../report/model/model");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("user", "admin"),
      allowNull: false,
      defaultValue: "user",
    },
    otp: {
      type: DataTypes.STRING,
    },
    otp_expired_time: {
      type: DataTypes.DOUBLE,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    verification_token: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
    paranoid: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
  }
);

module.exports = User;
