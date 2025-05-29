import registerUser from "../handlers/auth/register.js";
import loginUser from "../handlers/auth/login.js";
import logoutUser from "../handlers/auth/logoutUser.js";
import getUser from "../handlers/auth/getUser.js";
import updateUser from "../handlers/auth/updateUser.js";
import deleteUser from "../handlers/auth/deleteUser.js";
import authenticate from "../middleware/auth.js";

const userRoutes = [
  {
    method: "POST",
    path: "/user/register",
    handler: registerUser,
  },
  {
    method: "POST",
    path: "/user/login",
    handler: loginUser,
  },
  {
    method: "POST",
    path: "/user/logout",
    // options: {
    //   pre: [{ method: authenticate }],
    // },
    handler: logoutUser,
  },
  {
    method: "GET",
    path: "/user/{id}",
    options: {
      pre: [{ method: authenticate }],
      plugins: {
        "hapi-auth-cookie": false,
      },
    },
    handler: getUser,
  },
  {
    method: "PUT",
    path: "/user/{id}",
    options: {
      pre: [{ method: authenticate }],
    },
    handler: updateUser,
  },
  {
    method: "DELETE",
    path: "/user/{id}",
    options: {
      pre: [{ method: authenticate }],
    },
    handler: deleteUser,
  },
];

export default userRoutes;
