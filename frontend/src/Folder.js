import React from 'react';
import './Folder.css';

function Folder(props) {
  return (
    <div className="folder">
      <h2 className="folder__name">{props.name}</h2>
      <div className="folder__contents">
        {props.children}
      </div>
    </div>
  );
}

export default Folder;
