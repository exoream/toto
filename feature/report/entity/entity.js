class ReportCore {
  constructor(
    id,
    location,
    referenceLocation,
    latitude,
    longitude,
    image,
    statusDamage,
    description,
    userId,
    status,
    like,
    reason,
    createdAt,
  ) {
    this.id = id;
    this.location = location;
    this.referenceLocation = referenceLocation;
    this.latitude = latitude;
    this.longitude = longitude;
    this.image = image;
    this.statusDamage = statusDamage;
    this.description = description;
    this.userId = userId;
    this.status = status;
    this.like = like;
    this.reason = reason;
    this.createdAt = createdAt;
  }
}

module.exports = ReportCore;
