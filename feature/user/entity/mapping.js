const UserCore = require("./entity");

// Mapping dari Main ke Model
function usersCoreToUsersModel(mainData) {
  return {
    id: mainData.id,
    name: mainData.name,
    username: mainData.username,
    email: mainData.email,
    password: mainData.password,
    role: mainData.role,
    otp: mainData.otp,
    otp_expired_time: mainData.otpExpiredTime,
    is_active: mainData.isActive,
    verification_token: mainData.verificationToken,
  };
}

function listUserCoreToUserModel(mainData) {
  const listUser = [];
  for (const user of mainData) {
    const userModel = usersCoreToUsersModel(user);
    listUser.push(userModel);
  }
  return listUser;
}

// Mapping dari Model ke Main
function usersModelToUsersCore(mainData) {
  const userCore = new UserCore(
    mainData.id,
    mainData.name,
    mainData.username,
    mainData.email,
    mainData.password,
    mainData.confirmPassword,
    mainData.role,
    mainData.otp,
    mainData.otp_expired_time,
    mainData.is_active,
    mainData.verification_token
  );
  return userCore;
}

// Mapping dari Model ke Main untuk array
function listUserModelToUserCore(mainData) {
  const listUser = [];
  for (const user of mainData) {
    const userCore = usersModelToUsersCore(user);
    listUser.push(userCore);
  }
  return listUser;
}

module.exports = {
  usersCoreToUsersModel,
  listUserCoreToUserModel,
  usersModelToUsersCore,
  listUserModelToUserCore,
};
