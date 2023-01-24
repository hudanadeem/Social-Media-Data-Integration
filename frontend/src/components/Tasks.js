import "../styles/components/Tasks.css";

function Tasks({ tasks }) {
  return (
    <div className="tasks">
      {tasks.map((task) => {
        return (
          <p key={task.id} className="task">
            {"👉 "} {task.text}
          </p>
        );
      })}
    </div>
  );
}

export default Tasks;
