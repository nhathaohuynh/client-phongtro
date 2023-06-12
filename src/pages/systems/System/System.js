import React, { useState } from "react";
import "./system.scss";
import { Link, NavLink, Navigate, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { path } from "../../../utils/constant";
import { Navigation } from "../../../components";
import {
  getNumbeFromString,
  informSuccess,
  menuUser,
} from "../../../utils/order";
import { logout } from "../../../store/actions";

const System = () => {
  const { isLogin } = useSelector((state) => state.auth);
  const { userData } = useSelector((state) => state.user);
  const [active, setActive] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  if (!isLogin) return <Navigate to={`/${path.LOGIN}`} replace />;

  const handleClickExit = () => {
    informSuccess("Logout is successfully");
    dispatch(logout());
    navigate(`/${path.LOGIN}`);
  };
  return (
    <div className="system">
      <div className="system_header">
        <h1 className="system_header_logo">
          <Link to={path.HOME} className="link">
            Phòng trọ 123.com
          </Link>
        </h1>
        <div className="system_header_navigation">
          <Navigation system />
        </div>
      </div>
      <div className="system_content">
        <div className="system_left">
          <div className="system_user">
            <div className="system_user_info">
              <img
                src={
                  userData?.avatar ||
                  "https://source.unsplash.com/random/?car,night"
                }
                alt=""
              />
              <span className="system_user_common">
                <span className="system_user_name">
                  <strong>{userData?.name}</strong>
                </span>
                <span>{userData?.phone}</span>
              </span>
            </div>
            <div>
              Mã thành viên:{" "}
              <strong>
                {getNumbeFromString(userData?.id || "123456").slice(0, 6)}
              </strong>
            </div>
          </div>
          <ul className="system_menu">
            {menuUser?.map((item, index) => (
              <li key={crypto.randomUUID()} onClick={() => setActive(index)}>
                <NavLink
                  className="system_menu_item link"
                  style={{
                    backgroundColor:
                      index === active ? "rgba(0, 0, 0, 0.1)" : "",
                  }}
                  to={item.path}
                >
                  <img src={item.icon} alt="" />
                  <span>{item.text}</span>
                </NavLink>
              </li>
            ))}
            <li
              className="system_menu_item last_item"
              onClick={handleClickExit}
            >
              <img
                src="https://phongtro123.com/images/dashboard-logout.svg"
                alt=""
              />
              <span>Đăng xuất</span>
            </li>
          </ul>
        </div>
        <div className="system_right">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default System;
