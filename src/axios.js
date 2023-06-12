import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

instance.interceptors.request.use(
  (config) => {
    const accessToken =
      localStorage.getItem("persist:auth") &&
      JSON.parse(localStorage.getItem("persist:auth")).token.slice(1, -1);

    config.headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default instance;
