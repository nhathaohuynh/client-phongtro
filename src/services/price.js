import axiosConfig from "../axios";

export const apiPrice = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: "/api/v1/price",
      });
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};

export const apiArea = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: "/api/v1/area",
      });
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};

export const apiCategory = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: "/api/v1/category",
      });
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};
