import React from "react";
import "./NewPost.scss";
import { useSelector } from "react-redux";
// import moment from "moment";
// import "moment/locale/vi";

const NewPost = () => {
  const { newPosts } = useSelector((state) => state.post);
  return (
    <div className="newPost">
      <h3>Tin mới đăng</h3>
      {newPosts.length &&
        newPosts?.map((post) => {
          return (
            <div className="newPost_post" key={crypto.randomUUID()}>
              <img
                src={
                  JSON.parse(post?.images.image).length
                    ? JSON.parse(post?.images.image)[1]
                    : "https://source.unsplash.com/random/?supercar"
                }
                alt=""
              />
              <div className="newPost_content">
                <span className="newPost_title">{post.title}</span>
                <div className="newPost_des">
                  <span className="newPost_price">
                    {post?.attributes?.price}
                  </span>
                  <span className="newPost_time">
                    {post?.attributes.published}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default NewPost;
