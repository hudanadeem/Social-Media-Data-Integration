import React from 'react';
import './App.css';

function Panel(props) {
  return (
    <div className="panel">
      <h2>{props.title}</h2>
      <p>{props.content}</p>
    </div>
  );
}

export default Panel;
