import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import {
  NavRight,
  Pagination,
  Posts,
  ProvinceCard,
  Search,
} from "../../../components";
import { formatVietnameseToString } from "../../../utils/order";

const RentalApartment = () => {
  const { categories } = useSelector((state) => state.app);
  const { posts } = useSelector((state) => state.post);
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = +searchParams.get("page") || 1;
  const [categoryCurrent, setcategoryCurrent] = useState({});
  const [categoryCode, setCategoryCode] = useState("");
  const location = useLocation();
  useEffect(() => {
    const category = categories.find(
      (category) =>
        `/${formatVietnameseToString(category.value)}` === location.pathname
    );
    setcategoryCurrent(category);

    if (category) {
      setCategoryCode(category.code);
    }
  }, [location, searchParams]);
  return (
    <div className="homepage">
      <Search></Search>
      <h1 className="homepage_title">{categoryCurrent?.header}</h1>
      <p className="homepage_des">{categoryCurrent?.subheader}</p>
      <div className="homepage_province">
        <ProvinceCard></ProvinceCard>
      </div>
      <div className="homepage_content">
        <div className="homepage_post">
          <Posts data={posts} categoryCode={categoryCode}></Posts>
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setSearchParams}
            categoryCode={categoryCode}
          ></Pagination>
        </div>
        <div className="homepage_navright">
          <NavRight categoryCode={categoryCode}></NavRight>
        </div>
      </div>
    </div>
  );
};

export default RentalApartment;
