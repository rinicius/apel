import api from "./api";
import { getToken } from "./getToken";

export const decodeJWT = async () => {
  const token = localStorage.getItem("currentUser");
  api
    .post("/decode", { token })
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
