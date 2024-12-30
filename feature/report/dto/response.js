const { status } = require("init");

function reportResponse(report) {
  const response = {
    id: report.id,
    location: report.location,
    reference_location: report.referenceLocation,
    latitude: report.latitude,
    longitude: report.longitude,
    image: report.image,
    status_damage: report.statusDamage,
    description: report.description,
    status: report.status,
    like: report.like,
    reason: report.reason,
    created_at: report.createdAt,
  };
  return response;
}

function reportListResponse(reportlist) {
  const response = reportlist.map((report) => {
    return {
      id: report.id,
      location: report.location,
      image: report.image,
      status_damage: report.statusDamage,
      status: report.status,
      like: report.like,
      created_at: report.createdAt,
    };
  });
  return response;
}

module.exports = { reportResponse, reportListResponse };
