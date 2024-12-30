class UserCore {
    constructor(id, name, username, email, password, confirmPassword, role, otp, otpExpiredTime, isActive, verificationToken) {
      this.id = id;
      this.name = name;
      this.username = username;
      this.email = email;
      this.password = password;
      this.confirmPassword = confirmPassword;
      this.role = role;
      this.otp = otp;
      this.otpExpiredTime = otpExpiredTime;
      this.isActive = isActive;
      this.verificationToken = verificationToken;
    }
  }
  
  module.exports = UserCore;
  