function jobResponse(job) {
  const response = {
    id: job.id,
    name: job.name,
    nik: job.nik,
    address: job.address,
    phone: job.phone,
    file: job.file,
    status: job.status,
    created_at: job.createdAt,
  };
  return response;
}

function listJobResponse(jobs) {
  const listJob = [];
  for (const job of jobs) {
    const jobResponseData = jobResponse(job);
    listJob.push(jobResponseData);
  }
  return listJob;
}

module.exports = { jobResponse, listJobResponse };
