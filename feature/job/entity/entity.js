class JobCore {
  constructor(id, name, nik, address, phone, file, status, idUser, createdAt) {
    this.id = id;
    this.name = name;
    this.nik = nik;
    this.address = address;
    this.phone = phone;
    this.file = file;
    this.status = status;
    this.idUser = idUser;
    this.createdAt = createdAt;
  }
}

module.exports = JobCore;
