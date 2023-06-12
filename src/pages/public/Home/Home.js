import React, { useEffect } from "react";
import { Contact, Header, Introduction, Navigation } from "../../../components";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import "./home.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  getArea,
  getPostNewRealise,
  getPrice,
  getUser,
  logout,
} from "../../../store/actions";
import { getProvince } from "../../../store/actions/province";
import { path } from "../../../utils/constant";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLogin } = useSelector((state) => state.auth);
  const { userData } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getPrice());
    dispatch(getArea());
    dispatch(getPostNewRealise());
    dispatch(getProvince());
  }, []);

  useEffect(() => {
    if (isLogin) {
      setTimeout(() => {
        dispatch(getUser());
      }, 1000);
    }
  }, [isLogin]);

  useEffect(() => {
    if (!userData?.id) {
      console.log("aaaaa");
      console.log(userData);
      dispatch(logout());
      navigate(path.LOGIN);
    }
  }, [userData]);

  return (
    <div className="home">
      <Header></Header>
      <Navigation></Navigation>
      <Outlet />
      <Introduction></Introduction>
      <Contact></Contact>
    </div>
  );
};

export default Home;
