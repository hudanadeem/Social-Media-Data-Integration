import "./styles/App.css";
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
    <div className="app">
      <header className="app__header">
        <h1>Task Management Slightly Modified</h1>
      </header>
      <form className="app__form" onSubmit={onSubmit}>
        <input
          ref={inputText}
          type="text"
          placeholder="Describe the task"
          className="app__form-input"
        />
        <button className="app__btn">
          <span className="app_btn-svg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              width="16"
              height="16"
              fill="#fff"
            >
              <path d="M2 2h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1Zm4.655 8.595a.75.75 0 0 1 0 1.06L4.03 14.28a.75.75 0 0 1-1.06 0l-1.5-1.5a.749.749 0 0 1 .326-1.275.749.749 0 0 1 .734.215l.97.97 2.095-2.095a.75.75 0 0 1 1.06 0ZM9.75 2.5h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1 0-1.5Zm0 5h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1 0-1.5Zm0 5h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1 0-1.5Zm-7.25-9v3h3v-3Z"></path>
            </svg>
          </span>
          <span className="app__btn-text">Save Task</span>
        </button>
      </form>
      <Tasks tasks={tasks} />
    </div>
  );
}

export default App;
