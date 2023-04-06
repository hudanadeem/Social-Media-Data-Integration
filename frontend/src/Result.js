import React from 'react';
import moment from 'moment';

const Result = ({ result }) => {

  const date = moment.unix(result.created);
  const date2 = date.format("MMMM Do YYYY, h:mm:ss a");

    return (
      <div className="result">
        <div className="result-image">
          <h3>Keyword: {result.word}</h3>
        </div>
        <div className="result-content">
          <h3>{"News post"}</h3>
          <p className="result-meta">Source: {result.source}</p>
          <p className="result-meta">Url: {result.url}</p>
          <p className="result-meta">Title: {result.title}</p>
          <p className="result-meta">Created: {date2}</p>
        </div>
      </div>
    );
};

export default Result;
