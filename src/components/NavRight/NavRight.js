import React from "react";
import { formatVietnameseToString } from "../../utils/order";
import { icons } from "../../utils/icons";
import "./navright.scss";
import { createSearchParams, NavLink, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { formattedDataToNavRight } from "../../utils/order";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import NewPost from "../NewPost/NewPost";
import { path } from "../../utils/constant";

const { MdNavigateNext } = icons;

const Navitem = ({ title, data, isDouble, onClick, filterCondition }) => {
  return (
    <ul className="navright_menu">
      <h5 className="navright_title">{title}</h5>
      {isDouble
        ? data?.map((item) => {
            return (
              <li
                className="navright_item navright_double"
                key={crypto.randomUUID()}
              >
                <div className="double_item">
                  <span>{MdNavigateNext}</span>
                  <div
                    className="link navright_content"
                    onClick={() => onClick(item.left.code, filterCondition)}
                  >
                    <span>{item.left.value}</span>
                  </div>
                </div>
                <div className="double_item">
                  <span>{MdNavigateNext}</span>
                  <div
                    className="link navright_content"
                    onClick={() => onClick(item.right.code, filterCondition)}
                  >
                    <span>{item.right.value}</span>
                  </div>
                </div>
              </li>
            );
          })
        : data?.map((item) => {
            return (
              <li className="navright_item" key={crypto.randomUUID()}>
                <span>{MdNavigateNext}</span>
                <NavLink
                  className="link"
                  to={formatVietnameseToString(item.value)}
                >
                  <span>{item.value}</span>
                </NavLink>
              </li>
            );
          })}
    </ul>
  );
};
const NavRight = ({ categoryCode }) => {
  const { price, area } = useSelector((state) => state.app);
  const navigate = useNavigate();
  const location = useLocation();
  const { categories } = useSelector((state) => state.app);
  const [searchParams] = useSearchParams();
  const isCategoryCode = !!searchParams.get("categoryCode");

  const handleFilterPost = (code, filterCondition) => {
    let params = {};
    if (isCategoryCode && location.pathname !== "/search") {
      params.categoryCode = searchParams.get("categoryCode");
    }
    navigate({
      pathname: categoryCode ? location.pathname : path.HOME,
      search: createSearchParams({
        ...params,
        [filterCondition]: code,
      }).toString(),
    });
  };
  return (
    <div className="navright">
      {!categoryCode && (
        <Navitem title={"Cho thuê danh mục"} data={categories}></Navitem>
      )}
      <Navitem
        title={"Xem theo giá"}
        data={formattedDataToNavRight(price)}
        isDouble
        onClick={handleFilterPost}
        filterCondition="priceCode"
      ></Navitem>
      <Navitem
        title={"xem theo diện tích"}
        data={formattedDataToNavRight(area)}
        isDouble
        onClick={handleFilterPost}
        filterCondition="areaCode"
      ></Navitem>
      <NewPost></NewPost>
      <div></div>
    </div>
  );
};

export default NavRight;
