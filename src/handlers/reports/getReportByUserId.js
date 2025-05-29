import Report from "../../models/reportSchema.js";

const getReportByUserId = async (request, h) => {
  try {
        const { userId } = request.params;
        const getReports = await Report.find({_id:userId});

         if (getReports.length === 0) {
            return h.response({
            status: "fail",
            message: "No reports found for this user",
        }).code(404); 
        }

    return h.response({
      status: "success",
      data: getReports,
    }).code(200); 

    } catch (error) {
        console.error("Error fetching reports by userId: :", error);
    return h
      .response({
        status: "fail",
        message: "Failed to delete report",
      })
      .code(500);
    }
}

export default getReportByUserId;