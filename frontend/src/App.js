import "./App.css";
import { useRef, useState, useEffect } from "react";
import Tasks from "./components/Tasks";

function App() {
  const inputText = useRef("");
  let apiUrl = "";

  // hi frontend
  console.log(
    `process ${process.env.REACT_APP_SERVER_BASE} + process ${process.env.REACT_APP_SERVER_PORT}`
  );
  if (
    !process.env.REACT_APP_SERVER_BASE &&
    !process.env.REACT_APP_SERVER_PORT
  ) {
    apiUrl = "http://localhost:8080";
  } else {
    apiUrl = `${process.env.REACT_APP_SERVER_BASE}:${process.env.REACT_APP_SERVER_PORT}`; // grabbing variables from a configmap is good!
  }

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetchTasks() {
      const res = await fetch(`${apiUrl}/tasks`);
      const data = await res.json();
      setTasks(data.tasks);
    }

    fetchTasks();
  }, []);

  function onSubmit(e) {
    e.preventDefault();
    addNewTask();
  }

  function addNewTask() {
    const text = inputText.current.value;
    fetch(`${apiUrl}/task`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    }).then(async (response) => {
      const data = await response.json();

      const newData = [...tasks, data.task];
      setTasks(newData);
      inputText.current.value = "";
    });
  }
  return (
    <div className="App">
      <header className="App-header">
        <p>Task Management Slightly Modified</p>
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
