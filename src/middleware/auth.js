import jwt from "jsonwebtoken";

// Contoh: blacklist di-memory (untuk production, lebih baik pakai Redis/DB)
const tokenBlacklist = new Set();

export const addToBlacklist = (token) => {
  tokenBlacklist.add(token);
};

const authenticate = async (request, h) => {
  try {
    // Ambil token dari cookie
    const token = request.state.token;

    console.log("Token from cookie:", token); // Debug log
    console.log("All cookies:", request.state); // Debug log

    if (!token) {
      return h
        .response({
          status: "fail",
          message: "No token provided",
        })
        .code(401)
        .takeover();
    }

    // Cek apakah token ada di blacklist
    if (tokenBlacklist.has(token)) {
      return h
        .response({
          status: "fail",
          message: "Token has been blacklisted",
        })
        .code(401)
        .takeover();
    }

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    request.authenticatedUser = decoded;

    return h.continue;
  } catch (error) {
    console.error("Auth middleware error:", error);
    return h
      .response({
        status: "fail",
        message: "Invalid or expired token",
      })
      .code(401)
      .takeover();
  }
};

export default authenticate;
