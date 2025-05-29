import getAllReports from "../handlers/reports/getAllReports.js";
import getReportById from "../handlers/reports/getReportById.js";
import postReport from "../handlers/reports/postReport.js";
import editReportDescription from "../handlers/reports/editReportDescription.js";
import updateReportStatus from "../handlers/reports/updateReportStatus.js";
import deleteReportById from "../handlers/reports/deleteReportById.js";
import toggleSaveById from "../handlers/reports/toggleSaveById.js";
import getSaveById from "../handlers/reports/getSaveById.js";
import getReportByUserId from "../handlers/reports/getReportByUserId.js";

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
      pre: [{ method: authenticate }],
      plugins: {
        "hapi-auth-cookie": false,
      },
      payload: {
        output: "stream",
        parse: true,
        multipart: true,
        allow: "multipart/form-data",
      },
    },
    handler: postReport,
  },
  {
    method: "PUT",
    path: "/reports/{reportId}",
    handler: editReportDescription,
  },
  {
    method: "PUT",
    path: "/reports/{reportId}/status",
    handler: updateReportStatus,
  },
  {
    method: "DELETE",
    path: "/reports/{reportId}",
    handler: deleteReportById,
  },
  {
    method: "PATCH",
    path: "/reports/{reportId}/saved/{userId}",
    handler: toggleSaveById,
  },
  {
    method: "GET",
    path: "/reports/{reportId}/saved",
    handler: getSaveById,
  },
  {
    method: "GET",
    path: "/reports/{userId}",
    handler: getReportByUserId,
  },
];

export default reportRoutes;
