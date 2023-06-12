import React, { useEffect, useState } from "react";
import "./pagination.scss";
import { useSelector } from "react-redux";
import { icons } from "../../utils/icons";
import {
  createSearchParams,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { CalculatePages } from "../../utils/order";

const { HiOutlineArrowRight, HiOutlineArrowLeft } = icons;

const Pagination = ({ currentPage, setCurrentPage, categoryCode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const arrayParams = searchParams.entries();

  const [isShowStart, setIsShowStart] = useState(false);
  const [isShowEnd, setIsShowEnd] = useState(false);
  const [numberPages, setNumberPages] = useState([]);

  const { amountPost } = useSelector((state) => state.post);
  const amountPostRender = +process.env.REACT_APP_POST_LIMIT || 7;
  const minPage = 1;
  const maxPage = Math.ceil(amountPost / amountPostRender);

  useEffect(() => {
    const arrayPage = CalculatePages(currentPage, maxPage, minPage);
    setNumberPages(arrayPage);
    currentPage >= maxPage - 1 ? setIsShowEnd(false) : setIsShowEnd(true);
    currentPage > minPage + 1 ? setIsShowStart(true) : setIsShowStart(false);
  }, [currentPage, maxPage]);

  const appendParams = (arrayParams, page) => {
    const params = [];
    searchParams.append("page", page);
    for (let arrayParam of arrayParams) {
      params.push(arrayParam);
    }
    let objectParams = {};
    params.forEach((param) => {
      if (!objectParams[param[0]] && param[0] !== "page") {
        objectParams = {
          ...objectParams,
          [param[0]]: [param[1]],
        };
      } else if (param[0] === "page") {
        objectParams = {
          ...objectParams,
          [param[0]]: param[1],
        };
      } else {
        objectParams[param[0]].push(param[1]);
      }
    });
    if (categoryCode) objectParams.categoryCode = categoryCode;
    return objectParams;
  };
  const handleClickPagination = (page) => {
    const path = location?.pathname.includes("/search") ? "/search" : "/";
    setCurrentPage({ page: page });
    navigate(
      {
        pathname: path,
        search: createSearchParams(appendParams(arrayParams, page)).toString(),
      },
      {
        state: {
          select: location?.state?.select || null,
        },
      }
    );
  };

  return (
    <div className="pagination">
      {isShowStart && (
        <>
          <Page
            text={minPage}
            icon={HiOutlineArrowLeft}
            onClick={handleClickPagination}
          ></Page>
          <Page text="..."></Page>
        </>
      )}
      {numberPages.map((numberPage) => {
        return (
          <Page
            key={crypto.randomUUID()}
            text={numberPage}
            active={numberPage === currentPage}
            onClick={handleClickPagination}
          ></Page>
        );
      })}
      {isShowEnd && (
        <>
          <Page text="..."></Page>
          <Page
            icon={HiOutlineArrowRight}
            onClick={handleClickPagination}
            text={maxPage}
          ></Page>
        </>
      )}
    </div>
  );
};

const Page = ({ text, active, icon, onClick }) => {
  const content = icon || text;
  return (
    <span
      className={`pagination_item ${active && "pagination_active"}`}
      onClick={() => onClick && onClick(text)}
    >
      {content}
    </span>
  );
};

export default Pagination;
