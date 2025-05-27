import getAllReports from "../handlers/reports/getAllReports.js";
import getReportById from "../handlers/reports/getReportById.js";
import postReport from "../handlers/reports/postReport.js";

const reportRoutes = [
  {
    method: "GET",
    path: "/",
    handler: (request, h) => {
      return h.response("Hello, World!").code(200);
    },
  },
  {
    method: "GET",
    path: "/reports",
    handler: getAllReports,
  },
  {
    method: "GET",
    path: "/reports/{reportId}",
    handler: getReportById,
  },
  {
    method: "POST",
    path: "/reports",
    options: {
      payload: {
        output: "stream",
        parse: true,
        multipart: true,
        allow: "multipart/form-data",
      },
    },
    handler: postReport,
  },
];

export default reportRoutes;
