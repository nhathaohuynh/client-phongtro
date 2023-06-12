import React, { useState } from "react";
import "./Select.scss";
import { MdOutlineArrowDropUp, MdOutlineArrowDropDown } from "react-icons/md";

const Select = ({ label, name, value, onClick, data, disable, normal }) => {
  const [isShowDropDown, setIsShowDropDown] = useState(false);
  return (
    <div className="select" style={{ width: normal && "50%" }}>
      <label htmlFor={name}>{label}</label>
      <ul className="select_title">
        <li
          className="select_content"
          onClick={(e) => {
            e.preventDefault();
            setIsShowDropDown((prev) => !prev);
          }}
        >
          <span>{value || label}</span>
          {isShowDropDown && !disable ? (
            <MdOutlineArrowDropUp size={20} />
          ) : (
            <MdOutlineArrowDropDown size={20} />
          )}
          {isShowDropDown && !disable && data?.length > 0 ? (
            <ul className="select_option" style={{ height: normal && "100px" }}>
              {data?.length > 0 &&
                data?.map((item) => {
                  return (
                    <li
                      key={crypto.randomUUID()}
                      onClick={(e) => {
                        if (normal) {
                          return onClick(e, {
                            [name]: item?.value,
                          });
                        }
                        return onClick(e, {
                          [name]: item?.[`${name}_name`],
                          [`${name}_id`]: item?.[`${name}_id`],
                        });
                      }}
                    >
                      {!normal ? item?.[`${name}_name`] : item?.value}
                    </li>
                  );
                })}
            </ul>
          ) : null}
        </li>
      </ul>
    </div>
  );
};

export default Select;
