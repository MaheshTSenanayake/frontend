import axios from "../utils/axios";
import { paths } from "../routes/paths";

//----------------------------------------------------------------------------------------------------

function jwtDecoder(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join("")
  );

  return JSON.parse(jsonPayload);
}

//-----------------------------------------------------------------------------------------------------

export const tokenExpired = (exp) => {
  let expiredTimer;

  const currentTime = Date.now();

  const timeLeft = exp * 1000 - currentTime;

  clearTimeout(expiredTimer);

  expiredTimer = setTimeout(() => {
    sessionStorage.removeItem("accessToken");

    window.location.href = paths.login;
  }, timeLeft);
};

//-------------------------------------------------------------------------------------------------------

export const setSession = (accessToken, userData) => {
  if (accessToken) {
    sessionStorage.setItem("accessToken", accessToken);
    sessionStorage.setItem("userData", userData);

    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    // const { exp } = jwtDecoder(accessToken);

    // tokenExpired(exp);
  } else {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("userData");

    delete axios.defaults.headers.common.Authorization;
  }
};
