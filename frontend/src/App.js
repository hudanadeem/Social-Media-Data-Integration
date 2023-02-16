import "./App.css";
import { useRef, useState, useEffect } from "react";
import Panel from './Panel';


function App() {

  return (
    <div className="app">
      <header className="app__header">
        <h1>
          Weapons of Mass Destruction
        </h1>
      </header>
      <Panel content = "Content from Reddit goes here..."></Panel>
    </div>
  );
}

export default App;
