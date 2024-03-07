import axios from "axios";
import { LOGGED_IN_USER } from "constants";
import { REQUEST_HEADER_AUTH_KEY, TOKEN_TYPE, SERVER_API } from "constants";
import { TOKEN } from "constants";

const unauthorizedCode = [401];

console.log("SERVER_API", SERVER_API);

const BaseService = axios.create({
  baseURL: SERVER_API,
});

BaseService.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem(TOKEN);

    if (accessToken) {
      config.headers[REQUEST_HEADER_AUTH_KEY] = `${TOKEN_TYPE}${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

BaseService.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;

    if (response && unauthorizedCode.includes(response.status)) {
      localStorage.removeItem(TOKEN);
      localStorage.removeItem(LOGGED_IN_USER);
    }

    return Promise.reject(error);
  }
);

export default BaseService;
