import React, { useEffect, useState } from "react";
import "./header.scss";
import logo from "../../assets/logo.png";
import Button from "../Button/Button";
import { icons } from "../../utils/icons";
import { useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { path } from "../../utils/constant";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../../store/actions";
import {
  behaviorUser,
  getNumbeFromString,
  informSuccess,
} from "../../utils/order";
import { useSearchParams } from "react-router-dom";
import { useRef } from "react";

function Header() {
  const { isLogin } = useSelector((state) => state.auth);
  const { userData } = useSelector((state) => state.user);
  const [isShowBehaviorUser, setisShowBehaviorUser] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const page = params.get("page");
  const headerRef = useRef();
  const handleClickLogin = useCallback(() => {
    navigate(path.LOGIN);
  }, []);

  const handleCickRegister = useCallback(() => {
    navigate(path.REGISTER);
  }, []);

  const handleCickLogout = () => {
    informSuccess("Logout is successfully");
    dispatch(logout());
    setisShowBehaviorUser(false);
    navigate(path.LOGIN);
  };

  const handleClickManageUser = () => {
    setisShowBehaviorUser((prev) => !prev);
  };

  useEffect(() => {
    headerRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [page]);

  return (
    <div className="header" ref={headerRef}>
      <h1 className="header_logo">
        <Link className="link" to={path.HOME}>
          <img src={logo} alt="logo" />
        </Link>
      </h1>
      <ul className="header_actions">
        <li className="header_user">
          {isLogin && userData?.id ? (
            <div className="header_info">
              <img
                src={
                  userData?.avatar ||
                  "https://phongtro123.com/images/default-user.png"
                }
                alt=""
              />
              <div className="userInfo">
                <span>
                  xin chào <strong>{userData?.name}</strong>
                </span>
                <span>
                  <strong>Mã tài khoản:</strong>{" "}
                  {getNumbeFromString(userData?.id).slice(0, 6)}
                </span>
              </div>
            </div>
          ) : (
            <span>Phòng trọ 123 xin chào</span>
          )}
        </li>
        {isLogin && userData?.id ? (
          <li className="header_user">
            <Button
              second
              afterIcon={icons.MdOutlineArrowDropDown}
              onClick={handleClickManageUser}
            >
              Quản lý tài khoản
            </Button>
            {isShowBehaviorUser && (
              <ul className="header_behavior">
                {behaviorUser?.map((item) => (
                  <Link
                    className="header_behavior_item link"
                    key={crypto.randomUUID()}
                    to={item.path}
                  >
                    <img src={item.icon} alt="" />
                    <span>{item.text}</span>
                  </Link>
                ))}
                <li className="header_behavior_item" onClick={handleCickLogout}>
                  <img
                    src="https://phongtro123.com/images/dashboard-logout.svg"
                    alt=""
                  />
                  <span>Đăng xuất</span>
                </li>
              </ul>
            )}
          </li>
        ) : (
          <>
            <li>
              <Button
                primary
                onClick={handleClickLogin}
                afterIcon={icons.AiOutlineUserAdd}
              >
                Đăng nhập
              </Button>
            </li>
            <li>
              <Button
                primary
                afterIcon={icons.MdOutlineExitToApp}
                onClick={handleCickRegister}
              >
                Đăng ký
              </Button>
            </li>
          </>
        )}
        <li>
          <Button second afterIcon={icons.BsPlusLg}>
            Đăng bài
          </Button>
        </li>
      </ul>
    </div>
  );
}

export default Header;
