// Job request dto
function jobRequest(body) {
  const { name, nik, address, phone, id_user } = body;
  return { name, nik, address, phone, id_user };
}

module.exports = { jobRequest };
