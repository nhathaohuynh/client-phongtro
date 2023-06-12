import React, { useState } from "react";
import { Link, useNavigate,  } from "react-router-dom";

import { icons } from "../../utils/icons";
import "./post.scss";

const { AiFillStar, BsFillBookmarkStarFill, BsSuitHeart, BsSuitHeartFill } =
  icons;
const Post = ({ data }) => {
  const [isHeart, setIsHeart] = useState(false);
  const [isHoverHeart, setIsHoverHeart] = useState(false);
  const navigate = useNavigate();

  const post = {
    id: data?.id,
    title: data?.title,
    star: Array(+data.star).fill(0),
    name: data?.user.name,
    zalo: data?.user.zalo,
    images: JSON.parse(data?.images?.image),
    price: data?.attributes?.price,
    acreage: data?.attributes?.acreage,
    des: JSON.parse(data?.description),
    address: data?.address.split(",").at(-1),
  };

  const onClickHeart = (e) => {
    e.stopPropagation();
    setIsHeart((prev) => !prev);
  };

  const handleClickPost = () => {
    navigate(`detail-post/${post?.id}`);
  };
  return (
    <div className="post">
      <div className="post_image">
        <Link className="link" to={`detail-post/${post?.id}`}>
          <img src={post.images.length ? post.images[1] : "https://source.unsplash.com/random/?car"} alt="room" />
        </Link>
        <span className="post_countImage">{post.images.length}</span>
        <span
          className="post_love"
          onClick={onClickHeart}
          onMouseEnter={() => setIsHoverHeart(true)}
          onMouseLeave={() => setIsHoverHeart(false)}
        >
          {isHeart || isHoverHeart ? BsSuitHeartFill : BsSuitHeart}
        </span>
      </div>
      <div className="post_left">
        <div className="post_header">
          <h3 onClick={handleClickPost}>
            {post.star.map(() => (
              <AiFillStar
                size={16}
                color="orange"
                key={crypto.randomUUID()}
              ></AiFillStar>
            ))}
            {post.title}
          </h3>
          <span>{BsFillBookmarkStarFill}</span>
        </div>
        <div className="post_body">
          <div className="post_location">
            <h4 className="post_price">{post.price}</h4>
            <span>{post.acreage}</span>
            <span className="post_address">{post.address}</span>
          </div>
          <p className="post_des">{post.des}</p>
        </div>
        <div className="post_footer">
          <div className="post_info">
            <img src="https://phongtro123.com/images/default-user.png" alt="" />
            <span>{post.name}</span>
          </div>
          <div className="post_contact">
            <button>Gọi {post.zalo}</button>
            <button>Nhắn zalo</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
