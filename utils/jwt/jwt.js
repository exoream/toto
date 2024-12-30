const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { errorResponse } = require("../helper/response");
const { message } = require("../constanta/constanta");
dotenv.config();
const secretKey = process.env.JWTSECRET;

function createToken(id, role) {
  const token = jwt.sign(
    { id, role, exp: Math.floor(Date.now() / 1000) + 60 * 60 * 5 }, // Expired in 5 hours
    secretKey,
    { algorithm: "HS256" }
  );
  return token;
}

function createVerificationToken(email) {
  const token = jwt.sign(
    { email, exp: Math.floor(Date.now() / 1000) + 300 },
    secretKey,
    { algorithm: "HS256" }
  );
  return token;
}

function extractTokenVerifikasi(req) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  const decoded = jwt.verify(token, secretKey);
  const email = decoded.email;
  console.log("Decoded Token:", email);
  return email;
}

// Fungsi untuk mengekstrak informasi dari token
function extractToken(req) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  const decoded = jwt.verify(token, secretKey);
  const id = decoded.id;
  const role = decoded.role;
  console.log("Decoded Token:", decoded);
  console.log("ID:", id);
  console.log("Role:", role);
  return { id, role };
}

function jwtMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  console.log("Authorization Header:", authHeader);

  const token = authHeader && authHeader.split(" ")[1];
  console.log("Token:", token);

  if (!token) {
    return res.status(401).json(errorResponse("Unauthorized"));
  }

  jwt.verify(token, secretKey, (err, user) => {
    console.log("JWT Verification Error:", err ? err.message : "Unknown error");
    console.log("Secret Key:", secretKey);
    if (err) {
      return res.status(401).json(errorResponse("Unauthorized"));
    }

    req.user = user;

    next();
  });
}

module.exports = { createToken, jwtMiddleware, extractToken, createVerificationToken, extractTokenVerifikasi };
