import React from 'react';
import Moment from 'moment';
import moment from 'moment';

const Post = ({ post }) => {
  // const date = new Date(post.created * 1000);
  // const date_string = new Date(post.created * 1000).toLocaleDateString()
  // const hours = date.getHours();
  // const minutes = "0" + date.getMinutes();
  // const seconds = "0" + date.getSeconds();
  // const date_display = date_string + " " + hours + "/" + minutes.substr(-2) + "/" + seconds.substr(-2);
  const ups = parseInt(post.ups).toLocaleString();

  const date = moment.unix(post.created);
  const date2 = date.format("MMMM Do YYYY, h:mm:ss a");

  return (
    <div className="post">
      <div className="post-image">
        <img src={post.thumbnail} alt={post.word} />
      </div>
      <div className="post-content">
        <h2>{post.word}</h2>
        <p className="post-meta">Ups: {ups}</p>
        <p className="post-meta">Upvote Ratio: {post.upvote_ratio}</p>
        <p className="post-meta">Subreddit: {post.subreddit}</p>
        <p className="post-meta">Created: {date2}</p>
      </div>
    </div>
  );
};

export default Post;
