const JobCore = require("./entity");

// Mapping dari Main ke Model
function jobCoreToJobModel(mainData) {
  return {
    id: mainData.id,
    name: mainData.name,
    nik: mainData.nik,
    address: mainData.address,
    phone: mainData.phone,
    file: mainData.file,
    status: mainData.status,
    id_user: mainData.id_user,
    created_at: mainData.createdAt,
  };
}

function listJobCoreToJobModel(mainData) {
  const listJob = [];
  for (const job of mainData) {
    const jobModel = jobCoreToJobModel(job);
    listJob.push(jobModel);
  }
  return listJob;
}

// Mapping dari Model ke Main
function jobModelToJobCore(mainData) {
  const jobCore = new JobCore(
    mainData.id,
    mainData.name,
    mainData.nik,
    mainData.address,
    mainData.phone,
    mainData.file,
    mainData.status,
    mainData.id_user,
    mainData.created_at
  );
  return jobCore;
}

// Mapping dari Model ke Main untuk array
function listJobModelToJobCore(mainData) {
  const listJob = [];
  for (const job of mainData) {
    const jobCore = jobModelToJobCore(job);
    listJob.push(jobCore);
  }
  return listJob;
}

module.exports = {
  jobCoreToJobModel,
  listJobCoreToJobModel,
  jobModelToJobCore,
  listJobModelToJobCore,
};
