import axiosConfig from "../axios";

export const apiPosts = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const reponse = await axiosConfig({
        url: "/api/v1/post",
        method: "get",
      });
      resolve(reponse);
    } catch (err) {
      reject(err);
    }
  });
};

export const apiPostLimit = (page) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "post",
        url: `api/v1/post/?page=${page}`,
      });
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};
export const apiPostCondition = (query) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "post",
        url: "api/v1/post/condition",
        params: query,
      });
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};

export const apiPostNewRealise = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: "/api/v1/post/newRealise",
      });
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};
