import Report from "../../models/reportSchema.js";

function formatDate(date) {
  return (
    date
      .toLocaleString("id-ID", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Asia/Jakarta",
      })
      .replace(",", ",") + " WIB"
  );
}

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

    // Ketergan waktu untuk setiap status
    const time = formatDate(new Date());
    const statusWithTime = status.map((s) => ({
      ...s,
      time: time,
    }));

    // Cek status selesai apa belum
    const isCompleted = statusWithTime.some(
      (s) => s.statusName?.toLowerCase() === "selesai"
    );

    let updateQuery = { $push: { status: { $each: statusWithTime } } };
    if (isCompleted) {
      updateQuery.$unset = { lat: "", lon: "" };
    }

    const updatedReport = await Report.findByIdAndUpdate(
      reportId,
      updateQuery,
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
