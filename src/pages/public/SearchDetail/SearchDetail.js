import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import {
  NavRight,
  Pagination,
  Posts,
  ProvinceCard,
  Search,
} from "../../../components";

const RentalApartment = () => {
  const location = useLocation();
  const { posts } = useSelector((state) => state.post);
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = +searchParams.get("page") || 1;

  return (
    <div className="homepage">
      <Search dataInputs={location?.state.select}></Search>
      <h1 className="homepage_title">{location?.state?.header}</h1>
      <p className="homepage_des">{location?.state?.subtitle}</p>
      <div className="homepage_province">
        <ProvinceCard></ProvinceCard>
      </div>
      <div className="homepage_content">
        <div className="homepage_post">
          <Posts data={posts}></Posts>
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setSearchParams}
          ></Pagination>
        </div>
        <div className="homepage_navright">
          <NavRight></NavRight>
        </div>
      </div>
    </div>
  );
};

export default RentalApartment;
