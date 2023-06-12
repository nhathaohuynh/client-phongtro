import React from "react";
import "./searchItem.scss";

const SearchItem = ({ text, afterIcon, beforeIcon, sign, defaultText }) => {
  return (
    <div className={`searchItem ${sign && "sign"}`}>
      <div className="searchItem_left" style={{ color: text && "#1266dd" }}>
        {beforeIcon && beforeIcon}
        {text || defaultText}
      </div>
      {afterIcon && afterIcon}
    </div>
  );
};

export default SearchItem;
