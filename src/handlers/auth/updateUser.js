import User from "../../models/userSchema.js";
import cloudinary from "../../config/cloudinary.js";

const updateUser = async (request, h) => {
  try {
    const { id } = request.params;
    const { username, email, fullName, profileUrl } = request.payload;

    // Ambil pengguna berdasarkan ID
    const user = await User.findById(id);
    if (!user) {
      return h.response({ status: "fail", message: "User not found" }).code(404);
    }

    // Jika ada foto baru, upload ke Cloudinary
    let newProfileUrl = profileUrl;
    if (request.payload.profileUrl) {
      const photo = request.payload.photo;
      newProfileUrl = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({ folder: "profiles" }, (error, result) => {
          if (error) reject(error);
          else resolve(result.secure_url);
        });
        photo.pipe(stream);
      });
    }

    // Update data pengguna
    user.username = username || user.username;
    user.email = email || user.email;
    user.fullName = fullName || user.fullName;
    user.profileUrl = newProfileUrl || user.profileUrl;

    // Simpan perubahan
    const updatedUser = await user.save();

    return h
      .response({
        status: "success",
        message: "User updated successfully",
        data: {
          userId: updatedUser._id,
          username: updatedUser.username,
          email: updatedUser.email,
          fullName: updatedUser.fullName,
          profileUrl: updatedUser.profileUrl,
        },
      })
      .code(200);
  } catch (error) {
    console.error("Error updating user:", error);
    return h.response({ status: "fail", message: "Failed to update user" }).code(500);
  }
};

export default updateUser;
