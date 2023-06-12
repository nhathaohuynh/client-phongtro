import React from "react";
import {
  NavRight,
  Pagination,
  Posts,
  ProvinceCard,
  Search,
} from "../../../components/";
import { inforHomepage } from "../../../utils/order";

import "./homepage.scss";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

const HomePage = () => {
  const { posts } = useSelector((state) => state.post);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = +searchParams.get("page") || 1;

  return (
    <div className="homepage">
      <Search></Search>
      <h1 className="homepage_title">{inforHomepage.title}</h1>
      <p className="homepage_des">{inforHomepage.des}</p>
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

export default HomePage;
