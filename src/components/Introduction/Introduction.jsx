import React from "react";
import {
  dataIntroduction as intro,
  formatVietnameseToString,
} from "../../utils/order";
import "./Introduction.scss";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { icons } from "../../utils/icons";
import { Button } from "../../components/index";

const { AiFillStar } = icons;
const Introduction = () => {
  const { categories } = useSelector((state) => state.app);
  return (
    <div className="intro">
      <h4 className="intro_title">{intro.title}</h4>
      <div className="intro_des">
        <span>{intro.des.first}</span>
        {categories.length &&
          categories?.map((category) => (
            <span key={crypto.randomUUID()}>
              <Link
                className="link"
                to={formatVietnameseToString(category.value)}
              >
                {category.value}
              </Link>
            </span>
          ))}
        <span>{intro.des.second}</span>
      </div>
      <div className="intro_statistics">
        <ul>
          {intro.statistics.map((item) => {
            return (
              <li key={crypto.randomUUID()}>
                <h6>{item.value}</h6>
                <span>{item.name}</span>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="intro_subtitle">
        <h5>{intro.subTitle}</h5>
        <span className="star">
          <AiFillStar></AiFillStar>
          <AiFillStar></AiFillStar>
          <AiFillStar></AiFillStar>
          <AiFillStar></AiFillStar>
          <AiFillStar></AiFillStar>
        </span>
        <p className="intro_comment">{intro.feedback}</p>
        <span>{intro.customer}</span>
      </div>
      <div className="intro_upload">
        <h6>{intro.question}</h6>
        <span>{intro.answer}</span>
        <Button second size="sm">
          Đăng tin
        </Button>
      </div>
    </div>
  );
};

export default Introduction;
