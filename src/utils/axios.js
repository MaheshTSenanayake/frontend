import axios from "axios";
import { BASE_URL } from "../http-common";

const axiosInstance = axios.create({ baseURL: BASE_URL });

const getToken = () => {
  return sessionStorage.getItem("accessToken");
};

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers["x-access-token"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    return Promise.reject(
      (error.response && error.response.data) || "Something went wrong"
    );
  }
);

export default axiosInstance;

export const endpoints = {
  auth: {
    user_auth: "/auth/signin",
    register_user: "/auth/signup",
  },
  user: {
    all_issues: "/issue/getissues",
    add_issue: "/issue/addissue",
    delete_issue: "/issue/deletebyid",
    update_issue: "/issue/updatebyid",
  },
};
