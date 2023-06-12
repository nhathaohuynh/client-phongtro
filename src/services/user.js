import axios from "../axios";
import axisosDefault from "axios";

export const apiGetUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "get",
        url: "/api/v1/user",
      });
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};

export const apiGetProvincesVietNam = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axisosDefault({
        url: "https://vapi.vnappmob.com/api/province/",
        method: "get",
      });

      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};
export const apiGetDistricts = (province_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axisosDefault({
        url: `https://vapi.vnappmob.com/api/province/district/${province_id}`,
        method: "get",
      });
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};

export const apiGetWards = (district_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axisosDefault({
        url: `https://vapi.vnappmob.com/api/province/ward/${district_id}`,
        method: "get",
      });
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};
