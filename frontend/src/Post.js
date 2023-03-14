import React from 'react';

const Post = ({ post }) => {
  const date = new Date(post.created * 1000).toLocaleDateString();
  const ups = parseInt(post.ups).toLocaleString();

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
        <p className="post-meta">Created: {date}</p>
      </div>
    </div>
  );
};

export default Post;