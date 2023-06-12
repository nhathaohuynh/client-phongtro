import React, { memo, useState } from "react";
import Button from "../Button/Button";
import { icons } from "../../utils/icons";
import SearchItem from "../SearchItem/SearchItem";
import { searchTypes } from "../../utils/order";
import "./search.scss";
import Model from "../Model/Model";
import { useSelector } from "react-redux";
import { createSearchParams, useNavigate } from "react-router-dom";
import { path } from "../../utils/constant";

const { FiSearch } = icons;

const Search = ({ dataInputs }) => {
  const navigate = useNavigate();
  const { categories, price, area, provinces } = useSelector(
    (state) => state.app
  );

  const [name, setName] = useState("");
  const [contentModel, setContentModel] = useState([]);
  const [isModel, setIsModel] = useState(false);
  const [title, setTitle] = useState("");

  const [select, setSelect] = useState(
    dataInputs || {
      home: {},
      location: {},
      price: {},
      area: {},
    }
  );

  const middleWareData = (content) => {
    const dataCoppy = [...content];
    dataCoppy.sort((a, b) => a?.order - b?.order);
    return dataCoppy;
  };
  const handleSubmit = (e, query) => {
    e.stopPropagation();
    setSelect((prev) => ({ ...prev, ...query }));
    setIsModel(false);
  };

  const handleFilter = (content, typeFilter, title) => {
    if (typeFilter === "area" || typeFilter === "price") {
      setContentModel(middleWareData(content));
    } else {
      setContentModel(content);
    }
    setName(typeFilter);
    setTitle(title);
    setIsModel(true);
  };

  const typeOfSearch = (kindOfSearch) => {
    if (kindOfSearch === "home") {
      const title = "Chọn loại bất động sản";
      return handleFilter(categories, kindOfSearch, title);
    } else if (kindOfSearch === "price") {
      const title = "Chọn giá";
      return handleFilter(price, kindOfSearch, title);
    } else if (kindOfSearch === "area") {
      const title = "Chọn diện tích";
      return handleFilter(area, kindOfSearch, title);
    } else {
      const title = "chọn tỉnh thành phố";
      return handleFilter(provinces, kindOfSearch, title);
    }
  };

  const handleClickSearch = () => {
    let params = {};

    Object.entries(select).forEach((item) => {
      if (item[0] === "home" && item[1].code) {
        params = {
          ...params,
          categoryCode: item[1].code,
        };
      } else if (item[0] === "location" && item[1].code) {
        params = {
          ...params,
          provinceCode: item[1].code,
        };
      } else if (item[0] === "price" && item[1].code) {
        params = {
          ...params,
          priceCode: item[1].code,
        };
      } else if (item[0] === "area" && item[1].code) {
        params = {
          ...params,
          areaCode: item[1].code,
        };
      }
    });
    navigate(
      {
        pathname: `/${path.SEARCH_DETAIL}`,
        search: createSearchParams(params).toString(),
      },
      {
        state: {
          header: `${
            select?.home?.value ? select?.home?.value : "Phòng Trọ"
          } , Giá Rẻ, Tiện Nghi, Mới Nhất 2023`,
          subtitle: `Cho thuê phòng trọ - Kênh thông tin số 1 về ${
            select?.home?.value ? select?.home?.value : "Phòng Trọ"
          } giá rẻ, phòng trọ sinh viên, phòng trọ cao cấp mới nhất năm 2023. Tất cả nhà trọ cho thuê giá tốt nhất tại Việt Nam.`,
          select: select,
        },
      }
    );
  };
  return (
    <div className="search">
      {searchTypes.length &&
        searchTypes?.map((types) => (
          <div
            className="search_wrapper"
            key={crypto.randomUUID()}
            onClick={() => typeOfSearch(types.sign)}
          >
            <SearchItem
              sign={types.sign === "home" && true}
              text={select[types.sign].value}
              defaultText={types.type}
              afterIcon={types.afterIcon}
              beforeIcon={types.beforeIcon}
            ></SearchItem>
          </div>
        ))}
      <div className="search_wrapper" onClick={handleClickSearch}>
        <Button primary beforeIcon={FiSearch}>
          Search
        </Button>
      </div>
      {isModel && (
        <Model
          setModel={setIsModel}
          data={contentModel}
          title={title}
          name={name}
          select={select}
          handlesubmit={handleSubmit}
        ></Model>
      )}
    </div>
  );
};

export default memo(Search);
