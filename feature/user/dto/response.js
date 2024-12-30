function loginResponse(user, token) {
  const response = {
    id: user.id,
    name: user.name,
    username: user.username,
    email: user.email,
    token: token,
  };
  return response;
}

function userResponse(user) {
  const response = {
    id: user.id,
    name: user.name,
    username: user.username,
    email: user.email,
  };
  return response;
}

function userListResponse(userList) {
  const response = userList.map((user) => ({
    id: user.id,
    name: user.name,
    username: user.username,
    email: user.email,
  }));
  return response;
}

module.exports = { loginResponse, userResponse, userListResponse };
