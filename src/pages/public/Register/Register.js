import "./register.scss";
import React, { useEffect, useState } from "react";
import Button from "../../../components/Button/Button";
import { Link } from "react-router-dom";
import InputForm from "../../../components/InputForm/InputForm";
import { path } from "../../../utils/constant";
import { useDispatch } from "react-redux";
import * as authActions from "../../../store/actions";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { informFail, informSuccess } from "../../../utils/order";

const Register = () => {
  const dispatch = useDispatch();
  const { isLogin, msg, update } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [invalids, setInvalids] = useState([]);
  const [inputs, setInputs] = useState({
    name: "",
    phone: "",
    password: "",
  });

  useEffect(() => {
    if (isLogin) {
      informSuccess(msg);
      navigate(path.HOME);
    } else {
      if (inputs.name && inputs.password && inputs.phone) {
        informFail(msg);
      }
    }
  }, [isLogin, update]);
  const handleClickRegister = async () => {
    const isInvalid = !!validationInput(inputs);
    if (isInvalid) return;
    dispatch(authActions.register(inputs));
    navigate();
  };

  const handleOnchangeInputs = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validationInput = (inputs) => {
    const fields = Object.entries(inputs);
    let countError = 0;
    fields.forEach((field) => {
      switch (field[0]) {
        case "name":
          if (!field[1]) {
            setInvalids((prev) => [
              ...prev,
              { msg: "This field dose not empty !", field: field[0] },
            ]);
            countError++;
          }
          break;
        case "phone":
          if (!field[1]) {
            setInvalids((prev) => [
              ...prev,
              { msg: "This field dose not empty !", field: field[0] },
            ]);
            countError++;
          }
          if (!+field[1]) {
            setInvalids((prev) => [
              ...prev,
              { msg: " Phone number is invalid !", field: field[0] },
            ]);
            countError++;
          }
          break;
        case "password":
          if (!field[1]) {
            setInvalids((prev) => [
              ...prev,
              { msg: "This field dose not empty", field: field[0] },
            ]);
            countError++;
          }
          if (field[1].length < 6) {
            setInvalids((prev) => [
              ...prev,
              { msg: "Password is least 6 character", field: field[0] },
            ]);
            countError++;
          }
          break;
        default:
          break;
      }
    });
    return countError;
  };

  return (
    <div className="register">
      <h3>register</h3>
      <div className="register_username">
        <InputForm
          label="Username"
          placeholder="Username"
          name="name"
          id="username"
          type="text"
          value={inputs.name}
          onChange={handleOnchangeInputs}
          invalids={invalids}
          setInvalids={setInvalids}
        ></InputForm>
      </div>
      <div className="register_username">
        <InputForm
          label="Your phone"
          placeholder="Your phone"
          name="phone"
          id="phone"
          type="tel"
          value={inputs.phone}
          invalids={invalids}
          setInvalids={setInvalids}
          onChange={handleOnchangeInputs}
        ></InputForm>
      </div>
      <div className="register_password">
        <InputForm
          label="Password"
          placeholder="password"
          name="password"
          id="password"
          type="password"
          value={inputs.password}
          onChange={handleOnchangeInputs}
          invalids={invalids}
          setInvalids={setInvalids}
        ></InputForm>
      </div>
      <Button primary onClick={handleClickRegister}>
        Register
      </Button>
      <div className="register_other">
        <span>
          <p>
            Do you have an account ?{" "}
            <Link className="link" to={`/${path.LOGIN}`}>
              Login now
            </Link>
          </p>
        </span>
      </div>
    </div>
  );
};

export default Register;
