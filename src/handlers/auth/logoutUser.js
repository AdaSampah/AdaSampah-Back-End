import { addToBlacklist } from "../../middleware/auth.js";

const logoutUser = async (request, h) => {
  try {
    const token = request.state.token;

    console.log("Logout token:", token); // Debug log

    if (!token) {
      return h
        .response({
          status: "fail",
          message: "No active session",
        })
        .code(400); // Changed to 400 instead of 401
    }

    // Tambahkan token ke blacklist
    addToBlacklist(token);

    // Hapus cookie dengan setting yang sama seperti saat login
    const response = h.response({
      status: "success",
      message: "Logout successful",
    });

    // Gunakan setting cookie yang sama dengan login
    response.unstate("token", {
      path: "/",
      isHttpOnly: true,
      isSecure: true, // Only secure in production
      sameSite: "Strict",
    });

    return response.code(200);
  } catch (error) {
    console.error("Logout error:", error);
    return h
      .response({
        status: "error",
        message: "Logout failed",
      })
      .code(500);
  }
};

export default logoutUser;
