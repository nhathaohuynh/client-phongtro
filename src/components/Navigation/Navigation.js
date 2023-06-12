import React, { useEffect } from "react";
import "./navigation.scss";
import { formatVietnameseToString } from "../../utils/order";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { path } from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../../store/actions";

const Navigation = ({ system }) => {
  const location = useLocation();
  const { categories } = useSelector((state) => state.app);
  const [active, setActive] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategory());
  }, []);

  useEffect(() => {
    if (
      location.pathname === `/${path.REGISTER}` ||
      location.pathname === `/${path.LOGIN}` ||
      location.pathname === `/${path.SEARCH_DETAIL}` ||
      location.pathname.includes(path.SYSTEM.slice(0, -1))
    )
      setActive();
  }, [location.pathname]);
  const handleClickNavigation = (index) => {
    setActive(index);
  };

  return (
    <div
      className="navigation"
      style={{ justifyContent: system && "flex-start" }}
    >
      <div className="container">
        <ul className="navigation_menu">
          <li>
            <NavLink
              className={`${
                active === 0 ? "navigation_active" : ""
              } navigation_nav link`}
              onClick={() => handleClickNavigation(0)}
              to={path.HOME}
            >
              Trang chủ
            </NavLink>
          </li>
          {categories?.length > 0 &&
            categories?.map((item, index) => {
              return (
                <li key={crypto.randomUUID()}>
                  <NavLink
                    className={`${
                      active === index + 1 ? "navigation_active" : ""
                    } navigation_nav link`}
                    onClick={() => handleClickNavigation(index + 1)}
                    to={`/${formatVietnameseToString(item.value)}`}
                  >
                    {item.value}
                  </NavLink>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default Navigation;
