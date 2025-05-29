import Report from "../../models/reportSchema.js";

const updateReportStatus = async (request, h) => {
  try {
    const { reportId } = request.params;
    const { status } = request.payload;

    // Validasi status yang diterima
    if (!status || !Array.isArray(status)) {
      return h
        .response({ status: "fail", message: "Invalid status format" })
        .code(400);
    }

    const updatedReport = await Report.findByIdAndUpdate(
      reportId,
      { $push: { status: { $each: status } } },
      { new: true }
    );

    if (!updatedReport) {
      return h
        .response({ status: "fail", message: "Report not found" })
        .code(404);
    }

    return h
      .response({
        status: "success",
        message: "Report status updated successfully",
        data: updatedReport,
      })
      .code(200);
  } catch (error) {
    console.error("Error updating report status:", error);
    return h
      .response({
        status: "fail",
        message: "Failed to update report status",
      })
      .code(500);
  }
};

export default updateReportStatus;
