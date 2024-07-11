import axios from "axios";
import { BASE_URL } from "../http-common";

const axiosInstance = axios.create({ baseURL: BASE_URL });

axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong"
    )
);

export default axiosInstance;

export const endpoints = {
  auth: {
    user_auth: "/auth/signin",
    register_user: "/auth/signup",
  },
  /* user: {
    get_all_charts: "everything",
    delete_everything: "/everything",
    update_everything: "/everything",
  }, */
};
