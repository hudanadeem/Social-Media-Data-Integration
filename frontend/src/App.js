import "./App.css";
import { useRef, useState, useEffect } from "react";
import Tasks from "./components/Tasks";

import { getTasks, postNewTasks } from "./utils/api";

function App() {
  const inputText = useRef("");

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTasks().then((allTasks) => setTasks(allTasks));
  }, []);

  function onSubmit(e) {
    e.preventDefault();
    addNewTask();
  }

  function addNewTask() {
    const text = inputText.current.value;

    postNewTasks(text)
      .then((response) => response.json())
      .then((data) => {
        const newData = [...tasks, data.task];
        setTasks(newData);

        inputText.current.value = "";
      });
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Task Management Slightly Modified</h1>
      </header>
      <form onSubmit={onSubmit}>
        <input ref={inputText} type="text" placeholder="describe the task" />
        &nbsp; <button>Save Task</button>
      </form>
      <Tasks tasks={tasks} />
    </div>
  );
}

export default App;
