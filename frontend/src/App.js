import "./App.css";
import React from 'react';
import {BrowserRouter as Router, Routes ,Route} from 'react-router-dom'
import Home from './Components/pages/Home'

function App() {
  return (
    <div className="app">
      <Router>
          <Routes>
            <Route path='/' exact Component={Home}/>
          </Routes>
      </Router>
    </div>
  );

}

export default App;
