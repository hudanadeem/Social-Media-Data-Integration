import React, { useEffect, useState } from "react";
import "./App.css";
import { getPosts } from "./api/api";

function Panel(props) {
  const [content, setContent] = useState([]);

  useEffect(() => {
    getPosts().then((posts) => {
      setContent(posts);
    });
  }, []);

  return (
    <div className="panel">
      <h2>{props.title}</h2>
      <p>{JSON.stringify(content)}</p>
    </div>
  );
}

export default Panel;
