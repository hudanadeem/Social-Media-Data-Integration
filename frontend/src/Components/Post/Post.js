import React from 'react';
import moment from 'moment';

export const Post = ({ post }) => {

  const ups = parseInt(post.ups).toLocaleString();

  const date = moment.unix(post.created);
  const date2 = date.format("MMMM Do YYYY, h:mm:ss a");

  return (
    <div className="post">
      <div className="post-image">
        <h3>Keyword: {post.word}</h3>
      </div>
      <div className="post-content">
        <h3>{"Reddit post"}</h3>
        <p className="post-meta">Title: {post.title}</p>
        <p className="post-meta">Ups: {ups}</p>
        <p className="post-meta">Upvote Ratio: {post.upvote_ratio}</p>
        <p className="post-meta">Subreddit: {post.subreddit}</p>
        <p className="post-meta">Created: {date2}</p>
      </div>
    </div>
  );
};

//export default Post;
