import "./login.scss";
import React, { useState, useEffect } from "react";
import Button from "../../../components/Button/Button";
import { Link } from "react-router-dom";
import InputForm from "../../../components/InputForm/InputForm";
import { path } from "../../../utils/constant";
import { useDispatch } from "react-redux";
import * as authActions from "../../../store/actions/";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { informFail, informSuccess } from "../../../utils/order";

const Login = () => {
  const { isLogin, msg, update } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [invalids, setInvalids] = useState([]);
  const [inputs, setInputs] = useState({
    phone: "",
    password: "",
  });

  useEffect(() => {
    if (isLogin) {
      informSuccess(msg);
      navigate(path.HOME);
    } else {
      if (inputs.phone && inputs.password) informFail(msg);
    }
  }, [isLogin, update]);

  const handleClickLogin = () => {
    const isInvalid = !!validationInputs(inputs);
    if (isInvalid) return;
    dispatch(authActions.login(inputs));
  };

  const handleOnChangeInput = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validationInputs = (inputs) => {
    let countError = 0;
    const fields = Object.entries(inputs);
    fields.forEach((field) => {
      switch (field[0]) {
        case "phone":
          if (!field[1]) {
            countError++;
            setInvalids((prev) => [
              ...prev,
              {
                field: field[0],
                msg: "This field does not empty",
              },
            ]);
          }
          if (!+field[1]) {
            countError++;
            setInvalids((prev) => [
              ...prev,
              {
                field: field[0],
                msg: "Phone number is invalid",
              },
            ]);
          }
          break;
        case "password":
          if (!field[1]) {
            countError++;
            setInvalids((prev) => [
              ...prev,
              {
                field: field[0],
                msg: "This field does not empty",
              },
            ]);
          }
          if (field[1].length < 6) {
            countError++;
            setInvalids((prev) => [
              ...prev,
              {
                field: field[0],
                msg: "Password is least 6 character",
              },
            ]);
          }
          break;
        default:
          break;
      }
    });
    return countError;
  };

  return (
      <div className="login">
        <h3>Login</h3>
        <div className="login_username">
          <InputForm
            label="Your phone"
            placeholder="Your phone"
            name="phone"
            id="phone"
            type="text"
            value={inputs.phone}
            onChange={handleOnChangeInput}
            invalids={invalids}
            setInvalids={setInvalids}
          ></InputForm>
        </div>
        <div className="login_password">
          <InputForm
            label="Password"
            placeholder="password"
            name="password"
            id="password"
            type="password"
            value={inputs.password}
            onChange={handleOnChangeInput}
            invalids={invalids}
            setInvalids={setInvalids}
          ></InputForm>
        </div>
        <Button primary onClick={handleClickLogin}>
          Log in
        </Button>
        <div className="login_other">
          <span>
            <Link className="link">You forgot passowrd</Link>
          </span>
          <span>
            <Link className="link" to={`/${path.REGISTER}`}>
              Create new account
            </Link>
          </span>
        </div>
      </div>
  );
};

export default Login;
