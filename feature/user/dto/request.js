const UserCore = require("../entity/entity");

function userRequest(body) {
  const { name, username, email, password, confirm_password } = body;
  return { name, username, email, password, confirmPassword: confirm_password };
}

function userUpdateRequest(body) {
  const { name, username, email} = body;
  return { name, username, email};
}

function updatePasswordRequest(body) {
  const { old_password, new_password, confirm_password } = body;
  return { oldPassword: old_password, newPassword: new_password, confirmPassword: confirm_password };
}

function loginRequest(body) {
  const { email, password } = body;
  return { email, password };
}

function newPasswordRequest(body) {
  const { password, confirm_password } = body;
  return { password, confirmPassword: confirm_password};
}

module.exports = { userRequest, loginRequest, userUpdateRequest, updatePasswordRequest, newPasswordRequest };
