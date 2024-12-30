const generateOTP = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let otp = "";
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    otp += chars[randomIndex];
  }
  return otp;
};

module.exports = { generateOTP };
