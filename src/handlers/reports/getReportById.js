import mongoClient from "../../config/mongoose.js";
import { ObjectId } from "mongodb";

const getReportById = async (request, h) => {
  try {
    const { reportId } = request.params;
    const db = mongoClient.db("Capstone");
    const collection = db.collection("Reports");
    const report = await collection.findOne({ _id: new ObjectId(reportId) });

    if (!report) {
      return h
        .response({ status: "fail", message: "Report not found" })
        .code(404);
    }

    return h.response({ status: "success", data: report }).code(200);
  } catch (error) {
    console.error("Error fetching report by ID:", error);
    return h
      .response({ status: "fail", message: "Failed to fetch report" })
      .code(500);
  }
};

export default getReportById;
