import "./App.css";
import React from 'react';
// import Post from './Post';
// import { getPosts } from "./api/api";
// import Folder from './Folder';
// import React, { useState, useEffect } from 'react';


// import ReactDOM from 'react-dom'
import Navbar from "./Components/Navbar";
import {BrowserRouter as Router, Routes ,Route} from 'react-router-dom'
import Home from './Components/pages/Home'

function App() {

  return (
    <div className="app">
      {/* <header className="app__header">
        <h1>Weapons of Mass Destruction</h1>
      </header> */}
      <Router>
        <Navbar />
          <Routes>
            <Route path='/' exact Component={Home}/>
          </Routes>
      </Router>
    </div>
  );

}

export default App;
