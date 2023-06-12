import React from "react";
import { inforProvince } from "../../utils/order";
import "./province.scss";

const ProvinceCard = () => {
  return (
    <>
      {inforProvince.length &&
        inforProvince?.map((item) => {
          return (
            <div className="provinceCard" key={crypto.randomUUID()}>
              <img
                src={item.path}
                alt="Province"
                className="provinceCard_image"
              />
              <span className="provinceCard_location">{item.location}</span>
            </div>
          );
        })}
    </>
  );
};

export default ProvinceCard;
