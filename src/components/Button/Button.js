import React from "react";
import { memo } from "react";
import "./button.scss";

const Button = ({
  primary,
  second,
  beforeIcon,
  afterIcon,
  onClick,
  children,
  active,
  size,
}) => {
  return (
    <button
      className={`${
        primary ? "primary" : second === true ? "second" : "third"
      } button ${afterIcon ? "afterIcon" : ""} ${
        beforeIcon ? "beforeIcon" : ""
      } ${active ? "active" : ""} ${size ? size : ""}`}
      onClick={onClick}
    >
      {beforeIcon && <span>{beforeIcon}</span>}
      {children}
      {afterIcon && <span>{afterIcon}</span>}
    </button>
  );
};

export default memo(Button);
