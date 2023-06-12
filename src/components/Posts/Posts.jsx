import React, { useEffect } from "react";
import Button from "../Button/Button";
import "./posts.scss";
import { useState } from "react";
import Post from "../Post/Post";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getPostCondition } from "../../store/actions";
const Posts = ({ data, categoryCode }) => {
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState(0);
  const posts = data || [];
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const arrayParams = searchParams.entries();
    let params = [];
    for (let arrayParam of arrayParams) {
      params.push(arrayParam);
    }
    let query = {};
    params.forEach((param) => {
      if (!query[param[0]]) {
        query = {
          ...query,
          [param[0]]: [param[1]],
        };
      } else {
        query[param[0]].push(param[1]);
      }
    });

    if (categoryCode) query.categoryCode = categoryCode;
    dispatch(getPostCondition(query));
  }, [searchParams, categoryCode]);

  const handleClickFillerDefault = () => {
    setIsActive(0);
  };

  const handleClickFillerNew = () => {
    setIsActive(1);
  };

  return (
    <div className="posts">
      <div className="posts_header">
        <div className="posts_title">
          <h4>Danh sách bài đăng</h4>
          <span>
            Cập nhật:
            <time title="Thứ 5, 13:24 09/03/2023">13:24 09/03/2023</time>
          </span>
        </div>
        <div className="posts_filter">
          <span>sắp xếp:</span>
          <Button
            active={isActive === 0 ? true : false}
            onClick={handleClickFillerDefault}
          >
            Mặc định
          </Button>
          <Button
            active={isActive === 1 ? true : false}
            onClick={handleClickFillerNew}
          >
            Mới nhất
          </Button>
        </div>
      </div>
      {posts?.length ? (
        posts?.length &&
        posts?.map((post) => {
          return <Post data={post} key={crypto.randomUUID()}></Post>;
        })
      ) : (
        <h2 className="posts_empty">Không có bài viết phù hợp</h2>
      )}
    </div>
  );
};

export default Posts;
