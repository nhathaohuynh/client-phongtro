import axiosConfig from "../axios";

export const apiProvince = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: "/api/v1/province",
      });
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};
