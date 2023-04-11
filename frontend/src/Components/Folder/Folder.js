import React from 'react';
import './Folder.css';

export const Folder = (props) => {
  //let name = props.name ? props.name : "tempName";

  let propClass = props.name + "-folder";

  return (
    <div className="folder">
      <h2 data-testid={propClass} className="folder__name">{props.name}</h2>
      <div className="folder__contents">
        {props.children}
      </div>
    </div>
  );
}
