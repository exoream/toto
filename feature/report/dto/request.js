function reportRequest(body) {
  const {
    location,
    reference_location,
    latitude,
    longitude,
    status_damage,
    description,
    user_id,
  } = body;
  return {
    location,
    referenceLocation: reference_location,
    latitude,
    longitude,
    statusDamage: status_damage,
    description,
    userId: user_id,
  };
}

module.exports = { reportRequest };
